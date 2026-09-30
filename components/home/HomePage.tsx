'use client';
import Image from 'next/image';
import Link from 'next/link';
import { BrandStar } from '../brand/BrandStar';
import { HeroRoom } from './HeroRoom';
import { BrandShell, ReadingLink } from '../brand/BrandShell';
import { Glossary } from '../brand/Glossary';
import { ObjectGallery } from '../brand/ObjectGallery';
import { HomeMusic } from './HomeMusic';
import { StoryStack } from './StoryStack';
import styles from '../brand/Brand.module.css';

export function HomePage({ initialConcern }: { initialConcern?: string }) {
 return <BrandShell>
  <HomeMusic/>
  <section className={styles.hero} aria-labelledby="home-title"><div className={styles.heroIntro}><div><span className={styles.sectionLabel}>SAJU, SPACE & SOMETHING MORE.</span><h1 id="home-title">Good energy.<br /><strong>Your kind of living.</strong></h1></div><div className={styles.heroCopy}><p>당신의 사주,<br />더 좋게 흐를 수 있게.<br /><strong>풍수로 채워드릴게요.</strong></p><ReadingLink id="hero-reading-cta"/><span>나를 읽는 사주 · 나를 닮은 공간</span></div></div><HeroRoom/><div className={styles.heroFoot}><span>FOR YOUR NEXT CHAPTER.</span><a href="#feelings-title">SCROLL TO FEEL SOMETHING ↓</a></div></section>
  <StoryStack initialConcern={initialConcern}/>
  <section className={styles.neighborhood}><div className={styles.sectionLabel}>A PLACE THAT GETS YOU <span>02 /</span></div><h2>Find a place<br />that <strong>feels like you.</strong></h2><div className={styles.editorialBottom}><p>우리 동네와 나, 얼마나 잘 맞을까?<br />내 사주와 동네의 흐름을 함께 읽고,<br />나에게 어울리는 방을 사진으로 만나보세요.</p><ReadingLink topic="neighborhood">우리 동네와 나의 궁합 알아보기</ReadingLink></div><div className={styles.resultGrid}><article className={styles.matchCard}><span>YOUR NEIGHBOURHOOD MATCH</span><div className={styles.matchGraphic} aria-hidden="true"><span>YOU</span><i><BrandStar/></i><span>HERE</span></div><h3>동네 궁합 점수,<br />잘 맞는 이유까지.</h3><p>동네를 둘러싼 산과 물, 길과 건물.<br />내 기운과 만나는 풍경을 살펴봐요.</p></article><article className={styles.interiorCard}><Image src="/images/landing/room-editorial.webp" alt="개인의 취향과 기운에 맞춰 제안할 인테리어의 분위기" fill sizes="(max-width:760px) 90vw, 44vw"/><div><span>YOUR PERSONAL INTERIOR</span><h3>저장하고 싶은 방.<br />이번에는, 나를 위한 방.</h3></div></article></div></section>
  <section className={styles.artSection}><div className={styles.artImage}><Image src="/images/landing/personal-art.png" alt="테라코타 해와 세이지 곡선을 담은 액자" fill sizes="(max-width:760px) 90vw, 42vw"/></div><div className={styles.artCopy}><span className={styles.sectionLabel}>MADE FOR YOUR ENERGY</span><h2>A little art.<br /><strong>All about you.</strong></h2><p>더 채우고 싶은 기운을<br />당신만의 색과 형태로 그려요.</p><p>매일 바라보는 작은 액자로,<br />늘 곁에 두는 배경화면으로.</p><ReadingLink>나를 위한 기운과 아트 알아보기</ReadingLink></div></section>
  <Glossary/>
  <section className={styles.storyTeaser}><div className={styles.sectionLabel}>SPACES HAVE STORIES <span>04 /</span></div><h2>Big names.<br /><strong>Another perspective.</strong></h2><div className={styles.companyRow}>{['samsung','hyundai','sk'].map(name=><Link href={`/stories#${name}`} key={name}><Image src={`/images/brands/${name}.png`} alt={`${name.toUpperCase()} 공간 사례 읽기`} width={160} height={64}/><span>Read the story</span></Link>)}</div><div className={styles.editorialBottom}><p>삼성, 현대, SK.<br />익숙한 기업의 공간에도 풍수의 이야기가 있어요.</p><Link className={styles.textLink} href="/stories">Explore the stories</Link></div></section>
  <section className={styles.objectSection}><div className={styles.sectionLabel}>LITTLE THINGS, LOVELY FEELINGS <span>05 /</span></div><div className={styles.sectionHeading}><h2>Objects to<br /><strong>fall for.</strong></h2><p>귀여워서 한 번, 오래 곁에 두고 싶어서 또 한 번.<br />마음에 드는 것들로 나다운 분위기를 채워요.</p></div><ObjectGallery/><div className={styles.collectionFooter}><span>THE CHAEUN EDIT / 01</span><Link className={styles.textLink} href="/shop">Meet the collection</Link></div></section>
  <section className={styles.finalCta}><span className={styles.sectionLabel}>IT STARTS WITH YOU.</span><h2>Make room<br /><strong>for yourself.</strong></h2><p>연애도, 새로운 시작도, 자꾸 마음이 가는 그 방도.<br />지금의 나에게서 이야기를 시작해요.</p><ReadingLink/></section>
 </BrandShell>;
}
