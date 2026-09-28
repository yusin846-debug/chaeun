'use client';

import { useState } from 'react';
import styles from './HomeMusic.module.css';

const videoId = 'zWjS6yAiFaU';

export function HomeMusic() {
  const [open, setOpen] = useState(false);

  return (
    <aside className={styles.music} aria-label="채운 배경음악">
      {open && (
        <div id="home-music-player" className={styles.panel}>
          <div className={styles.heading}>
            <span>VACANCE MIXTAPE</span>
            <button onClick={() => setOpen(false)} aria-label="배경음악 정지하고 닫기">×</button>
          </div>
          <iframe
            title="채운 배경음악 YouTube 플레이어"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <p>미뤄둔 책을 읽으며 · 재생이 안 되면 YouTube에서 들어주세요.</p>
          <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">YouTube에서 듣기 ↗</a>
        </div>
      )}
      <button
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={open ? 'home-music-player' : undefined}
        onClick={() => setOpen(!open)}
      >
        <span aria-hidden="true">♫</span>
        {open ? '음악 끄기' : '음악 켜기'}
      </button>
    </aside>
  );
}
