'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Brand.module.css';
const pages = [
  { path: '/', name: 'Home', shape: 'homeTag' },
  { path: '/about', name: 'About', shape: 'aboutTag' },
  { path: '/contact', name: 'Contact', shape: 'contactTag' },
  { path: '/shop', name: 'Shop', shape: 'shopTag' },
  { path: '/stories', name: 'Stories', shape: 'storiesTag' },
];
export function ReadingLink({ children = '내 사주에 어울리는 공간 보기', topic, className = '' }: { children?: React.ReactNode; topic?: string; className?: string }) {
  return <Link href={topic ? `/create?topic=${encodeURIComponent(topic)}` : '/create'} className={`${styles.cta} ${className}`}><span>{children}</span><span className={styles.arrow} aria-hidden="true">↗</span></Link>;
}
export function BrandShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return <div className={styles.site}>
    <a className={styles.skip} href="#main-content">본문으로 건너뛰기</a>
    <header className={styles.header}><Link href="/" className={styles.logo} aria-label="채운 홈">chaeun<span>✳</span></Link><span className={styles.headerNote}>A little more you.</span><ReadingLink /><button className={styles.menuButton} aria-expanded={open} aria-controls="brand-navigation" onClick={() => setOpen(!open)}>{open ? 'Close −' : 'Menu +'}</button></header>
    <nav id="brand-navigation" className={`${styles.rail} ${open ? styles.railOpen : ''}`} aria-label="주요 페이지">{pages.map(p => <Link key={p.path} href={p.path} onClick={() => setOpen(false)} className={`${styles.tag} ${styles[p.shape]}`} aria-current={path === p.path ? 'page' : undefined}>{p.name}<span aria-hidden="true">↗</span></Link>)}</nav>
    <main id="main-content" className={styles.main}>{children}</main>
    <footer className={styles.footer}><Link href="/" className={styles.logo}>chaeun<span>✳</span></Link><p>나의 이야기에서, 나의 공간으로.</p><div><Link href="/about">About</Link><Link href="/contact">Contact</Link><span>© CHAEUN {new Date().getFullYear()}</span></div></footer>
  </div>;
}
