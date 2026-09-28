'use client';

import { useState } from 'react';
import styles from './HomeMusic.module.css';

const tracks = [
  { id: '1yw_9RqvsW0', title: 'Der Feder Waltzer', artist: 'Mikkel Adler' },
  { id: 'oPz2wSwe8FM', title: 'An der Isar', artist: 'Arno Pohl' },
  { id: 'cSCxCyJmjvI', title: 'Hou Van Me', artist: 'Celia Cloten' },
];

export function HomeMusic() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const track = tracks[selected];
  const playlist = [...tracks.slice(selected), ...tracks.slice(0, selected)];

  return (
    <aside className={styles.music} aria-label="채운 배경음악">
      {open && (
        <div id="home-music-player" className={styles.panel}>
          <div className={styles.heading}>
            <span>THE CHAEUN SOUNDTRACK</span>
            <button onClick={() => setOpen(false)} aria-label="배경음악 정지하고 닫기">×</button>
          </div>
          <div className={styles.tracks} role="group" aria-label="배경음악 곡 선택">
            {tracks.map((item, index) => (
              <button key={item.id} aria-pressed={selected === index} onClick={() => setSelected(index)}>
                <span className={styles.number}>0{index + 1}</span>
                <span><strong>{item.title}</strong><small>{item.artist}</small></span>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <iframe
            key={track.id}
            title="채운 배경음악 YouTube 플레이어"
            src={`https://www.youtube.com/embed/${track.id}?autoplay=1&loop=1&playlist=${playlist.map(item => item.id).join(',')}&playsinline=1&rel=0`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <p>선택한 곡부터 세 곡을 이어서 들어요. 재생이 안 되면 YouTube에서 들어주세요.</p>
          <a href={`https://www.youtube.com/watch?v=${track.id}`} target="_blank" rel="noopener noreferrer">YouTube에서 듣기 ↗</a>
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
