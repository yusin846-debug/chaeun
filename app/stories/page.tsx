import Image from 'next/image';
import { BrandShell } from '@/components/brand/BrandShell';
import { cases } from '@/components/home/cases';
import s from '@/components/brand/Brand.module.css';
export default function StoriesPage(){return <BrandShell><section className={s.subpage}><span className={s.sectionLabel}>ANOTHER WAY TO READ A SPACE</span><h1 className={s.pageTitle}>Space stories.</h1><p className={s.pageLead}>삼성, 현대, SK.<br/>익숙한 건물에서 발견하는 또 다른 이야기.</p><p className={s.pageNote}>언론 보도와 외부 연구에서 소개한 풍수 해석을 모았어요.<br/>기업의 공식 설명과 외부의 해석은 구분해 읽어주세요.</p><div className={s.caseList}>{cases.map(c=><article id={c.brand.toLowerCase()} className={s.case} key={c.brand}><Image src={`/images/brands/${c.brand.toLowerCase()}.png`} alt={`${c.brand} 로고`} width={160} height={80}/><div><small>{c.label}</small><h2>{c.title}</h2><p>{c.text}</p><a href={c.href} target="_blank" rel="noreferrer">{c.source} · 원문 읽기 ↗</a></div></article>)}</div></section></BrandShell>}
