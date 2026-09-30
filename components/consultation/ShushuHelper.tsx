'use client';
import { useEffect, useRef, useState } from 'react';
import s from './ShushuHelper.module.css';
export function ShushuHelper({onSummary}:{onSummary:()=>void}){
 const [walking,setWalking]=useState(false);
 const [greeting,setGreeting]=useState(false);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>{const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');function moved(){if(reduced.matches)return;setWalking(true);if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>setWalking(false),350);}window.addEventListener('scroll',moved,{passive:true});return()=>{window.removeEventListener('scroll',moved);if(timer.current)clearTimeout(timer.current);};},[]);
 return <aside className={s.dock} aria-label="슈슈 도우미" onMouseEnter={()=>setGreeting(true)} onMouseLeave={()=>setGreeting(false)} onFocus={()=>setGreeting(true)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setGreeting(false);}}><div className={s.character} data-pose={greeting?'wave':walking?'walk':'sit'} role="img" aria-label={greeting?'앞발로 인사하는 슈슈':walking?'걸으며 따라오는 슈슈':'정면으로 앉아 있는 슈슈'}/><div className={s.controls}><p>네게 필요한 것부터<br/>함께 살펴볼까?</p><button onClick={onSummary}>내 흐름 보기</button><button onClick={()=>document.getElementById('space-items')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}>액자와 소품 보기</button></div></aside>;
}
