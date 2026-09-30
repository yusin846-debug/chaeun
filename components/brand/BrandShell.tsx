'use client';
import Link from 'next/link';
import { Daisy } from './Daisy';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Brand.module.css';
const pages = [
  { path: '/', name: 'Home', shape: 'homeTag' },
  { path: '/about', name: 'About', shape: 'aboutTag' },
  { path: '/contact', name: 'Contact', shape: 'contactTag' },
  { path: '/shop', name: 'Shop', shape: 'shopTag' },
  { path: '/stories', name: 'Stories', shape: 'storiesTag' },
];
export function ReadingLink({ children = '내 사주에 어울리는 공간 보기', topic, className = '', id }: { children?: React.ReactNode; topic?: string; className?: string; id?: string }) {
  return <Link id={id} href={topic ? `/create?topic=${encodeURIComponent(topic)}` : '/create'} className={`${styles.cta} ${className}`}><span>{children}</span></Link>;
}
export function BrandShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);
  useEffect(() => {
    if (path !== '/') return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const heroCta = document.getElementById('hero-reading-cta');
      const header = document.getElementById('brand-header');
      setHeroPassed(Boolean(heroCta && header && heroCta.getBoundingClientRect().bottom <= header.offsetHeight));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [path]);
  return <div className={styles.site}>
    <a className={styles.skip} href="#main-content">본문으로 건너뛰기</a>
    <header id="brand-header" className={styles.header}><Link href="/" className={styles.logo} aria-label="채운 홈">chaeun<span>✳</span></Link><span className={styles.headerNote}>A little more you.</span><ReadingLink className={`${styles.headerCta} ${path === '/' && !heroPassed ? styles.headerCtaHidden : ''}`} /><button className={styles.menuButton} aria-expanded={open} aria-controls="brand-navigation" onClick={() => setOpen(!open)}>{open ? 'Close −' : 'Menu +'}</button></header>
    <nav id="brand-navigation" className={`${styles.rail} ${open ? styles.railOpen : ''}`} aria-label="주요 페이지">{pages.map(p => <Link key={p.path} href={p.path} onClick={() => setOpen(false)} className={`${styles.tag} ${styles[p.shape]}`} aria-current={path === p.path ? 'page' : undefined}>{p.name}<span className={styles.currentStar} aria-hidden="true"><Daisy/></span></Link>)}</nav>
    <main id="main-content" className={styles.main}>{children}</main>
    <footer className={styles.footer}><Link href="/" className={styles.logo}>chaeun<span>✳</span></Link><p>나의 이야기에서, 나의 공간으로.</p><div><Link href="/about">About</Link><Link href="/contact">Contact</Link><span>© CHAEUN {new Date().getFullYear()}</span></div></footer>
  </div>;
}
