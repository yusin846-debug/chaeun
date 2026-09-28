"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useExperienceStore } from "@/lib/store";
import styles from "./HomePage.module.css";
import { StorySculpture } from "./StorySculpture";
import { getStoryIndex } from "./story-scroll";

const sections = [
  { id: "chaeun", label: "채운", shape: "cloud" },
  { id: "space", label: "공간·동네", shape: "arch" },
  { id: "art", label: "맞춤 아트", shape: "frame" },
  { id: "elements", label: "사주·풍수", shape: "wave" },
  { id: "stories", label: "사례", shape: "paper" },
  { id: "objects", label: "소품", shape: "oval" },
] as const;
const concerns = [
  { id: "lonely", image: "landing/night-room.png", imageAlt: "저녁의 작은 원룸에 켜진 따뜻한 조명", label: "혼자인 밤", title: "밖에서는 괜찮았는데,\n집에 오니 마음이 허전해.", reply: "혼자 있는 시간도, 나를 좋아하는 시간이 되도록.", note: "외로움도, 새로운 시작을 바라는 마음도 함께 이야기해요." },
  { id: "love", image: "glass-vase-flowers.png", imageAlt: "꽃과 유리 화병으로 설렘을 더한 공간", label: "연애", title: "좋아하는 사람은 있는데,\n왜 우리 사이는 제자리일까?", reply: "누군가를 좋아하는 마음. 그 안의 나부터 읽어봐요.", note: "설렘과 답답함 사이, 지금 가장 궁금한 이야기를 들려주세요." },
  { id: "career", image: "landing/work-corner.png", imageAlt: "집중할 수 있는 차분한 홈 오피스", label: "일과 시작", title: "열심히 달리고 있는데,\n내가 원하는 방향이 맞을까?", reply: "남들의 속도보다, 나에게 어울리는 방향으로.", note: "계속할지, 새로 시작할지. 마음에 걸리는 선택부터 이야기해요." },
  { id: "money", image: "landing/personal-art.png", imageAlt: "정돈된 선반 위의 그림과 따뜻한 조명", label: "돈 걱정", title: "차곡차곡 살고 싶은데,\n마음의 여유는 언제 생길까?", reply: "더 단단해지고 싶은 마음에도, 나만의 이야기가 있어요.", note: "돈에 대한 고민과 안정되고 싶은 마음을 함께 살펴봐요." },
  { id: "rest", image: "space-bedroom.png", imageAlt: "리넨 침구와 부드러운 빛의 침실", label: "쉼과 불안", title: "분명 쉬고 있는데,\n왜 마음은 쉬어지지 않을까?", reply: "애쓴 마음이 편히 머무를 수 있는 자리를 찾아요.", note: "요즘의 피로와 생각들, 가벼운 이야기부터 시작해요." },
  { id: "taste", image: "landing/studio.png", imageAlt: "크롬 의자와 버건디 테이블이 있는 취향의 원룸", label: "취향과 로망", title: "자꾸 저장하게 되는 그 방,\n나에게도 잘 어울릴까?", reply: "좋아하는 장면에는, 나를 발견할 단서가 있어요.", note: "마음에 든 인테리어와 소품, 어떤 점에 끌렸는지 이야기해요." },
] as const;
const cases = [
  { brand: "SK", label: "서린사옥 / 언론 보도", title: "사옥에는 왜\n거북의 형상이 있을까요?", text: "기둥과 출입구의 거북 형상은 불의 기운을 보완하려는 풍수 이야기로 보도됐어요.", source: "조선일보 · 2007", href: "https://biz.chosun.com/site/data/html_dir/2007/09/21/2007092101197.html", glyph: "水" },
  { brand: "SAMSUNG", label: "서초사옥 / 전문가 해석", title: "같은 땅도,\n다른 시선으로 읽으면.", text: "서초사옥 주변의 지형과 물의 흐름을 풍수 전문가의 관점으로 소개한 보도가 있어요.", source: "매경이코노미 · 2011", href: "https://www.mk.co.kr/news/business/5064418", glyph: "地" },
  { brand: "HYUNDAI", label: "양재사옥 / 외부 연구", title: "사옥을 읽는 시선이\n연구가 되기도 해요.", text: "2025년 연구는 현대차 양재사옥의 산과 하천, 건물 형태와 공간 구성을 풍수의 관점으로 분석했어요.", source: "산업진흥연구 · 2025", href: "https://doi.org/10.21186/IPR.2025.10.3.377", glyph: "形" },
];

function StartLink() {
  const startReading = useExperienceStore((state) => state.startReading);
  return <Link href="/create" className={styles.cta} onClick={startReading}><span>내 사주에 어울리는 공간 보기</span><span className={styles.arrow} aria-hidden="true">↗</span></Link>;
}

export function HomePage({ initialConcern }: { initialConcern?: string }) {
  const [active, setActive] = useState<string>("chaeun");
  const [concern, setConcern] = useState(() => Math.max(0, concerns.findIndex((item) => item.id === initialConcern)));
  const [room, setRoom] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const concernNavRef = useRef<HTMLDivElement>(null);
  const pendingAnchor = useRef<{ id: string; expires: number } | null>(null);
  const current = concerns[concern];

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = window.innerWidth < 760 ? 190 : window.innerHeight * .32;
      let next: string = sections[0].id;
      for (const section of sections) {
        if ((document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity) <= marker) next = section.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) next = "objects";
      const pending = pendingAnchor.current;
      if (pending) {
        const top = document.getElementById(pending.id)?.getBoundingClientRect().top;
        const offset = window.innerWidth < 760 ? 155 : 90;
        if (top === undefined || Math.abs(top - offset) < 6 || performance.now() > pending.expires || window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) pendingAnchor.current = null;
      }
      setActive(pendingAnchor.current?.id ?? next);
      const hero = heroRef.current;
      const sticky = stickyRef.current;
      if (hero && sticky) {
        const top = parseFloat(getComputedStyle(sticky).top) || 0;
        setConcern(getStoryIndex(top - hero.getBoundingClientRect().top, hero.offsetHeight - sticky.offsetHeight, concerns.length));
      }
      if (hero && window.innerWidth < 760) {
        const progress = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / hero.offsetHeight));
        hero.style.setProperty("--light-y", `${progress * 100}%`);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const interrupt = () => { pendingAnchor.current = null; schedule(); };
    const interruptKey = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) interrupt();
    };
    const initialIndex = concerns.findIndex((item) => item.id === initialConcern);
    if (initialIndex > 0 && !window.location.hash && heroRef.current && stickyRef.current) {
      const hero = heroRef.current;
      const sticky = stickyRef.current;
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      window.scrollTo({ top: hero.getBoundingClientRect().top + window.scrollY - top + (hero.offsetHeight - sticky.offsetHeight) * (initialIndex + .1) / concerns.length, behavior: "instant" });
    }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("keydown", interruptKey);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); window.removeEventListener("wheel", interrupt); window.removeEventListener("touchstart", interrupt); window.removeEventListener("keydown", interruptKey); };
  }, [initialConcern]);

  useEffect(() => {
    const rail = railRef.current;
    const selected = rail?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!rail || !selected || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({ left: selected.offsetLeft - (rail.clientWidth - selected.offsetWidth) / 2, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [active]);

  useEffect(() => {
    const nav = concernNavRef.current;
    const selected = nav?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (nav && selected && nav.scrollWidth > nav.clientWidth) {
      nav.scrollTo({ left: selected.offsetLeft - nav.offsetLeft - (nav.clientWidth - selected.offsetWidth) / 2, behavior: "instant" });
    }
  }, [concern]);

  const selectStory = (index: number) => {
    const hero = heroRef.current;
    const sticky = stickyRef.current;
    if (!hero || !sticky) return;
    const top = parseFloat(getComputedStyle(sticky).top) || 0;
    const destination = hero.getBoundingClientRect().top + window.scrollY - top + (hero.offsetHeight - sticky.offsetHeight) * (index + .1) / concerns.length;
    window.scrollTo({ top: Math.max(0, destination), behavior: "instant" });
    setConcern(index);
  };

  return <main className={styles.page}>
    <a className={styles.skip} href="#space">본문으로 건너뛰기</a>
    <header className={styles.header}><a href="#chaeun" className={styles.logo} aria-label="채운 첫 화면">CHAEUN<span>®</span></a><span className={styles.headerNote}>나의 이야기에서, 나의 공간으로.</span><StartLink /></header>
    <nav ref={railRef} className={styles.rail} aria-label="랜딩 목차">{sections.map((section, i) => <a key={section.id} href={`#${section.id}`} onClick={() => { pendingAnchor.current = { id: section.id, expires: performance.now() + 2200 }; setActive(section.id); }} className={`${styles.tag} ${styles[section.shape]}`} aria-current={active === section.id ? "location" : undefined}><span className={styles.tagIndex}>0{i + 1}</span><span>{section.label}</span><span className={styles.tagArrow} aria-hidden="true">↗</span></a>)}</nav>
    <div className={styles.content}>
      <section id="chaeun" ref={heroRef} className={styles.hero} aria-labelledby="hero-title">
        <div ref={stickyRef} className={styles.heroSticky}>
        <div className={styles.heroTop}><span className={styles.eyebrow}>FOR THE WAY YOU FEEL</span><span className={styles.small}>요즘, 어떤 마음인가요?</span></div>
        <div ref={concernNavRef} className={styles.concerns} aria-label="공감 이야기 선택">{concerns.map((item, i) => <button key={item.id} aria-pressed={concern === i} onClick={() => selectStory(i)}>{item.label}</button>)}</div>
        <div className={styles.heroComposition}>
          <div className={styles.storyCard}><div className={styles.storyText} aria-live="polite"><div key={current.id} className={styles.storyTransition}><span className={styles.storyNumber}>마음의 장면 / 0{concern + 1}</span><h1 id="hero-title">{current.title}</h1><p>{current.note}</p></div></div><div className={styles.cardAction}><StartLink /><span>생년월일시로 시작해요</span></div></div>
          <StorySculpture topic={current.id} />
        </div>
        <div className={styles.heroBottom}><p>사주로 지금의 나를 읽고,<br /><strong>우리 동네 궁합 점수부터, 맞춤 인테리어까지.</strong></p><span>생년월일시로 시작해요<br /><a href="#space">SCROLL / 0{concern + 1} — 06 ↓</a></span></div>
        </div>
      </section>
      <section id="space" className={`${styles.section} ${styles.space}`} aria-labelledby="space-title">
        <div className={styles.sectionIntro}><span className={styles.eyebrow}>01 / A ROOM THAT GETS YOU</span><span className={styles.small}>공감에서 시작하는 공간</span></div>
        <div className={styles.splitHeading}><h2 id="space-title">나와 잘 맞는 동네,<br /><em>나를 닮은 인테리어.</em></h2><p>{current.reply}<br /><br />사주와 지금의 고민을 함께 읽고,<br />나를 위한 색과 소재, 빛을 찾아가요.</p></div>
        <div className={styles.resultPreview}>
          <article className={styles.neighborhood}><span className={styles.eyebrow}>NEIGHBORHOOD MATCH</span><h3>우리 동네와 나,<br />얼마나 잘 맞을까?</h3><div className={styles.scoreDial} aria-label="상담 후 확인하는 동네 궁합 점수"><strong>?</strong><span>/ 100</span></div><p>내 사주와 동네의 흐름을 함께 읽고<br />궁합 점수와 잘 맞는 이유를 알려드려요.</p><span className={styles.resultLabel}>생년일시와 동네를 알려주면 확인할 수 있어요</span><StartLink /></article>
          <article className={styles.interiorPreview}><span className={styles.eyebrow}>PERSONAL INTERIOR</span><h3>내 사주에 어울리는<br />방을 사진으로 만나보세요.</h3><div><Image src="/images/landing/studio.png" alt="개인화 인테리어 추천에서 만나볼 수 있는 방의 분위기" fill sizes="(max-width:760px) 90vw, 40vw" /></div><p>나를 위한 색 · 소재 · 조명 · 배치</p></article>
        </div>
        <div className={styles.roomStage}><div className={styles.roomPhoto} key={room}><Image src={room === 0 ? "/images/landing/studio.png" : "/images/space-bedroom.png"} alt={room === 0 ? "크롬과 나무, 따뜻한 빛이 어우러진 원룸" : "차분한 리넨 침구와 그림이 있는 침실"} fill sizes="(max-width:760px) 100vw, 80vw" /></div><div className={styles.roomCaption}><span>ROOM / 0{room + 1}</span><h3>{room === 0 ? "좋아하는 나로 머무는 방." : "마음이 천천히 쉬어가는 방."}</h3><div className={styles.roomControls}><button onClick={() => setRoom(0)} aria-label="따뜻한 원룸 보기" aria-pressed={room === 0}>01</button><button onClick={() => setRoom(1)} aria-label="차분한 침실 보기" aria-pressed={room === 1}>02</button></div></div></div>
        <p className={styles.afterword}>누구에게나 좋은 방보다, <strong>나에게 어울리는 방.</strong></p>
      </section>
      <section id="art" className={`${styles.section} ${styles.art}`} aria-labelledby="art-title"><div className={styles.artPhoto}><Image src="/images/landing/personal-art.png" alt="테라코타 해와 청록색 곡선을 담은 맞춤 아트의 액자 연출" fill sizes="(max-width:760px) 100vw, 48vw" /></div><div className={styles.artCopy}><span className={styles.eyebrow}>02 / YOUR PERSONAL ART</span><h2 id="art-title">나를 위해<br />그린 <em>한 장.</em></h2><p>나에게 필요한 기운을<br />색과 형태로 담아요.</p><p className={styles.artSub}>매일 바라보는 작은 액자로,<br />늘 곁에 두는 배경화면으로.</p><StartLink /></div></section>
      <section id="elements" className={`${styles.section} ${styles.elements}`} aria-labelledby="elements-title"><span className={styles.eyebrow}>03 / THE LANGUAGE OF CHAEUN</span><h2 id="elements-title">사주로 나를 읽고,<br />풍수로 공간을 해석해요.</h2><div className={styles.explainGrid}><article><span className={styles.small}>나를 읽는 네 개의 기둥</span><div className={styles.pillars}>{["년", "월", "일", "시"].map((label) => <span key={label}>{label}</span>)}</div><h3>태어난 시간에서 시작하는 이야기.</h3><p>사주는 생년·월·일·시를 바탕으로 나를 해석하는 전통의 언어예요. 채운은 그 이야기를 지금의 고민과 연결해요.</p><a href="https://encykorea.aks.ac.kr/Article/E0025957" target="_blank" rel="noreferrer">사주 개념 읽기 ↗</a></article><article><span className={styles.small}>공간으로 이어지는 다섯 가지 기운</span><div className={styles.five}>{["목", "화", "토", "금", "수"].map((label, i) => <span key={label} style={{ background: ["#315848", "#b55a43", "#b89b62", "#f6f4ee", "#344950"][i], color: i === 2 || i === 3 ? "#252525" : "#fff" }}>{label}</span>)}</div><h3>색, 소재, 빛. 나의 공간의 언어.</h3><p>오행의 관계를 읽고, 풍수의 관점으로 내가 머무는 공간을 살펴봐요. 그 해석을 어울리는 분위기와 이미지로 제안해요.</p></article></div></section>
      <section id="stories" className={`${styles.section} ${styles.stories}`} aria-labelledby="stories-title"><span className={styles.eyebrow}>04 / SPACES & STORIES</span><div className={styles.splitHeading}><h2 id="stories-title">삼성, 현대, SK.<br /><em>공간에 담긴 이야기.</em></h2><p>익숙한 건물을 바라보는 또 하나의 시선.<br />풍수는 오늘의 공간에서도 이야기됩니다.</p></div><div className={styles.caseStack}>{cases.map((item) => <article className={styles.caseCard} key={item.brand}><span className={styles.caseBrand}><span className={styles.brandLogo}><Image src={`/images/brands/${item.brand === "SK" ? "sk.png" : item.brand === "SAMSUNG" ? "samsung.png" : "hyundai.png"}`} alt={`${item.brand} 로고`} width={145} height={58} /></span><small>{item.label}</small></span><h3>{item.title}</h3><p>{item.text}</p><a href={item.href} target="_blank" rel="noreferrer">{item.source} — 원문 읽기 ↗</a><span className={styles.caseGlyph} aria-hidden="true">{item.glyph}</span></article>)}</div></section>
      <section id="objects" className={`${styles.section} ${styles.objects}`} aria-labelledby="objects-title"><span className={styles.eyebrow}>05 / BRING THE FEELING HOME</span><h2 id="objects-title">마음에 든 이 분위기,<br /><em>내 공간에도.</em></h2><p className={styles.objectIntro}>귀여운 액막이 고양이부터, 밤을 포근하게 만드는 조명까지.<br />취향에도 마음에도 쏙 드는 것들을 찾아요.</p><div className={styles.objectGrid}>{[
          {src:"landing/lucky-cat.png", name:"곁을 지키는 액막이 고양이", note:"귀여운 마음의 부적", tag:"LUCKY OBJECT"},
          {src:"mushroom-lamps.png", name:"몽글몽글 버섯 조명", note:"하루를 마무리하는 따뜻한 빛", tag:"SOFT LIGHT"},
          {src:"glass-vase-flowers.png", name:"한 송이도 특별해지는 화병", note:"투명한 컬러와 작은 생기", tag:"A LITTLE BLOOM"},
          {src:"space-bedroom.png", name:"폭 안기고 싶은 패브릭", note:"기분 좋은 촉감의 쿠션과 침구", tag:"COZY TEXTURE"}
        ].map((item) => <article key={item.src}><div className={styles.objectImage}><Image src={`/images/${item.src}`} alt={item.name} fill sizes="(max-width:760px) 45vw, 20vw" /></div><span>{item.tag}</span><h3>{item.name}</h3><p>{item.note}</p></article>)}</div><div className={styles.closing}><p>먼저 나의 이야기를 듣고,<br />그다음, 곁에 둘 것들을 함께 골라요.</p><div><StartLink /><span className={styles.startNote}>생년월일시로 시작해요</span></div></div></section>
      <footer className={styles.footer}><a href="#chaeun" className={styles.logo}>CHAEUN</a><p>나의 이야기에서, 나의 공간으로.</p><span>© {new Date().getFullYear()} CHAEUN</span></footer>
    </div>
  </main>;
}
