'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import brand from '../brand/Brand.module.css';
import styles from './HeroRoom.module.css';

const objects = [
  { id: 'cushion', name: '보드라운 쿠션', element: '土 · 토', x: .20, y: .55, text: '포근한 촉감과 크림색은 토의 안정감을 떠올리게 해요. 편히 기대고 싶은 분위기를 만들어요.' },
  { id: 'lamp', name: '따뜻한 조명', element: '火 · 화', x: .595, y: .57, text: '따뜻한 빛과 버건디 색은 화의 온기와 생동감을 상징해요. 방에 다정한 표정을 더해요.' },
  { id: 'vase', name: '초록빛 화병과 꽃', element: '木 · 목', x: .505, y: .385, text: '초록색과 위로 자라는 꽃은 목의 성장과 시작을 떠올리게 해요. 작은 생기를 가까이 두는 방법이에요.' },
  { id: 'art', name: '곡선이 담긴 액자', element: '土 · 토', x: .438, y: .19, text: '모래빛 색과 완만한 곡선은 토의 차분함을 떠올리게 해요. 시선이 쉬어가는 장면을 만들어요.' },
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
      <span className={styles.hint}>작은 +를 눌러, 공간의 기운을 만나보세요</span>
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
