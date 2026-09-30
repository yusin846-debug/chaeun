'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import brand from '../brand/Brand.module.css';
import styles from './HeroRoom.module.css';

const objects = [
  { id: 'cushion', name: '보드라운 쿠션', element: '土 · 토', x: .20, y: .55, text: '토의 안정감을 담은 크림색 쿠션. 바쁜 하루 뒤에는 나를 편히 돌보고, 관계 속에서도 내 중심을 지키는 마음을 위한 소품이에요.' },
  { id: 'lamp', name: '따뜻한 조명', element: '火 · 화', x: .595, y: .57, text: '화의 온기를 담은 따뜻한 빛과 버건디 색. 좋아하는 마음을 조금 더 솔직하게 표현하고, 새로운 인연에 먼저 다가갈 자신감을 북돋는 포인트예요.' },
  { id: 'vase', name: '초록빛 화병과 꽃', element: '木 · 목', x: .505, y: .385, text: '목은 성장과 시작을 상징해요. 초록빛 화병과 위로 뻗는 꽃에, 익숙한 하루에서 한 걸음 나아가 새로운 만남을 시작할 용기를 담았어요.' },
  { id: 'art', name: '곡선이 담긴 액자', element: '土 · 토', x: .438, y: .19, text: '토의 차분함을 담은 모래빛 그림. 조급한 마음을 잠시 내려놓고, 나의 속도로 관계를 이어갈 여유와 안정감을 위한 장면이에요.' },
];

export function HeroRoom() {
  const photo = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const selected = objects.find(item => item.id === active);

  useEffect(() => {
    const node = photo.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height }));
    observer.observe(node);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.matchMedia('(hover: none)').matches) {
        const rect = node.getBoundingClientRect();
        node.style.setProperty('--beam-y', `${Math.max(0, Math.min(100, (innerHeight - rect.top) / (innerHeight + rect.height) * 100))}%`);
      }
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', scroll, { passive: true });
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', scroll); };
  }, []);

  // Keep the markers on the same objects when object-fit: cover crops the photograph.
  const scale = Math.max(size.width / 1536, size.height / 1024);
  const position = (x: number, y: number) => ({ left: x * 1536 * scale - (1536 * scale - size.width) / 2, top: y * 1024 * scale - (1024 * scale - size.height) / 2 });
  const illuminate = (x: number, y: number) => {
    photo.current?.style.setProperty('--beam-x', `${x}px`);
    photo.current?.style.setProperty('--beam-y', `${y}px`);
  };

  return <div className={styles.room} onKeyDown={event => { if (event.key === 'Escape') setActive(null); }}>
    <aside className={styles.flowNotice} aria-label="이 방에 담긴 풍수 이야기">
      <span className={styles.flowMark} aria-hidden="true">木 <i>→</i> 火 <i>→</i> 土</span>
      <div><span className={styles.flowEyebrow}>풍수 인테리어 예시 · FENG SHUI INSPIRATION</span><p><strong>목 → 화 → 토로 흐르는 기운을 개선하여,</strong><br />안정감과 용기, 그리고 새로운 인연에 대한 자신감을 북돋아 주는 풍수 인테리어.</p></div>
      <span className={styles.flowHint}>소품에 마우스를 올려보세요<span>모바일에서는 +를 눌러보세요 ↘</span></span>
    </aside>
    <div ref={photo} className={`${brand.heroPhoto} ${styles.photo}`} onPointerMove={event => {
      if (event.pointerType === 'touch') return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      illuminate(x, y);
      const hovered = objects.find(item => {
        const point = position(item.x, item.y);
        return Math.hypot((x - point.left) / (1536 * scale * .065), (y - point.top) / (1024 * scale * .09)) < 1;
      });
      if (hovered) setActive(hovered.id);
    }}>
      <Image src="/images/landing/room-editorial.webp" alt="쿠션, 조명, 화병과 액자에 담긴 기운을 살펴볼 수 있는 아늑한 작은 방" fill preload sizes="(max-width:760px) 100vw, 86vw"/>
      <div className={brand.lightBeam}/>
      {size.width > 0 && objects.map(item => {
        const point = position(item.x, item.y);
        return <button key={item.id} style={point} className={styles.point} aria-label={`${item.name}의 오행 의미`} aria-expanded={active === item.id} aria-controls={active === item.id ? 'room-object-detail' : undefined}
          onMouseEnter={() => setActive(item.id)} onFocus={() => { setActive(item.id); illuminate(point.left, point.top); }}
          onClick={() => { setActive(item.id); illuminate(point.left, point.top); }}><span aria-hidden="true">+</span></button>;
      })}
      <div className={brand.photoLabel}><span>THE FEELING OF HOME</span><span>작은 방에도, 나다운 흐름.</span></div>
    </div>
    {selected && <div id="room-object-detail" className={styles.detail} key={selected.id}>
      <div><span>{selected.element}</span><button aria-label="오브제 설명 닫기" onClick={() => setActive(null)}>×</button></div>
      <h3>{selected.name}</h3><p>{selected.text}</p>
    </div>}
  </div>;
}
