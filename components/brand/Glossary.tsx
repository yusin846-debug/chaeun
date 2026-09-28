'use client';
import Image from 'next/image';
import { useState } from 'react';
import styles from './Brand.module.css';
const terms = [
  { title: 'Saju', korean: '태어난 시간에서 시작하는 나의 이야기.', body: '년·월·일·시, 네 기둥과 일간의 관계를 읽어요. 그 해석에 지금의 고민을 더하면, 나를 돌아보는 새로운 이야기가 됩니다.', image: '/images/landing/personal-art.png', alt: '해와 곡선의 색으로 표현한 추상 아트' },
  { title: 'Five Elements', korean: '다섯 가지 기운, 서로를 채우는 관계.', body: '목·화·토·금·수는 단순한 개수보다 서로의 관계가 중요해요. 채운은 그 관계를 색과 소재, 분위기로 풀어냅니다.', image: '/images/landing/objects/vase.webp', alt: '올리브색 유리와 꽃이 만드는 색과 형태' },
  { title: 'Feng Shui', korean: '나를 둘러싼 풍경을 읽는 시선.', body: '산과 물, 길과 건물, 창으로 들어오는 빛과 장면. 풍수의 해석을 통해 내가 머무는 공간의 방향을 함께 찾아요.', image: '/images/landing/studio.png', alt: '햇빛과 가구가 어우러진 작은 방' },
];
export function Glossary() {
  const [active, setActive] = useState(0);
  return <section className={styles.glossary} aria-labelledby="language-title"><div className={styles.sectionLabel}>THE LANGUAGE OF CHAEUN <span>03 /</span></div><h2 id="language-title" className={styles.glossaryIntro}>Old wisdom.<br /><strong>A fresh perspective.</strong></h2><div className={styles.glossaryGrid}><div className={styles.termList} role="group" aria-label="사주와 풍수 개념 선택">{terms.map((t,i)=><button key={t.title} aria-pressed={i===active} aria-controls="term-explanation" onMouseEnter={()=>setActive(i)} onFocus={()=>setActive(i)} onClick={()=>setActive(i)}>{t.title}<span aria-hidden="true">↗</span></button>)}<p>단어에 머물러보세요. 새로운 이야기가 열려요.</p></div><article id="term-explanation" className={styles.termPanel}><div className={styles.termImage} key={active}><Image src={terms[active].image} alt={terms[active].alt} fill sizes="(max-width:760px) 90vw, 30vw" /></div><h3>{terms[active].korean}</h3><p>{terms[active].body}</p></article></div></section>;
}
