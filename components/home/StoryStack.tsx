'use client';
import { Fragment, useEffect, useRef, useState } from 'react';
import { topics } from '../brand/content';
import { ReadingLink } from '../brand/BrandShell';
import { StorySculpture } from './StorySculpture';
import styles from '../brand/Brand.module.css';
export function StoryStack({ initialConcern }: { initialConcern?: string }) {
 const initial = Math.max(0,topics.findIndex(t=>t.id===initialConcern));
 const [active,setActive]=useState(initial);
 const section=useRef<HTMLElement>(null);
 const anchors=useRef<(HTMLSpanElement|null)[]>([]);
 const cards=useRef<(HTMLElement|null)[]>([]);
 useEffect(()=>{
  let frame=0;
  const paint=()=>{frame=0; let current=0; const marker=window.innerWidth<760 ? (window.innerHeight<730 ? 235 : 295) : 230; anchors.current.forEach((anchor,i)=>{if(anchor&&anchor.getBoundingClientRect().top<=marker)current=i;});setActive(current); cards.current.forEach((card,i)=>{if(!card)return; const next=cards.current[i+1];const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches; const top=parseFloat(getComputedStyle(card).top)||100;const progress=next?Math.max(0,Math.min(1,1-(next.getBoundingClientRect().top-top)/card.offsetHeight)):0;card.style.setProperty('--card-scale',String(reduced?1:1-progress*.065));});};
  const scroll=()=>{if(!frame)frame=requestAnimationFrame(paint)};
  window.addEventListener('scroll',scroll,{passive:true}); window.addEventListener('resize',scroll);paint();
  if(initial>0)anchors.current[initial]?.scrollIntoView({behavior:'instant',block:'start'});
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll)};
 },[initial]);
 return <section ref={section} className={styles.storySection} aria-labelledby="feelings-title"><div className={styles.sectionLabel}>A NOTE TO YOURSELF <span>01 /</span></div><div className={styles.storyHeading}><h2 id="feelings-title">How are you,<br /><strong>really?</strong></h2><p>요즘, 어떤 마음인가요?<br />마음에 걸리는 이야기부터 시작해요.</p></div><div className={styles.topicLinks} aria-label="상담 주제 선택">{topics.map((t,i)=><button key={t.id} aria-pressed={active===i} onClick={()=>anchors.current[i]?.scrollIntoView({behavior:'instant',block:'start'})}>{t.label}</button>)}</div><div className={styles.stackLayout}><div className={styles.stackCards}>{topics.map((t,i)=><Fragment key={t.id}><span ref={el=>{anchors.current[i]=el}} className={styles.storyAnchor} aria-hidden="true"/><article ref={el=>{cards.current[i]=el}} data-index={i} key={t.id} className={styles.storyCard} style={{background:t.color,color:t.ink,top:`calc(var(--stack-top) + ${i*7}px)`}}><span className={styles.cardNumber}>0{i+1} / {t.label}</span><h3>{t.english}</h3><p className={styles.cardQuestion}>{t.title}</p><p className={styles.cardNote}>{t.note}</p><ReadingLink topic={t.id}>{t.cta}</ReadingLink></article></Fragment>)}</div><div className={styles.storyVisual}><StorySculpture topic={topics[active].id}/><span className={styles.visualCaption}>A FEELING, TAKING SHAPE. / 0{active+1}</span></div></div></section>;
}
