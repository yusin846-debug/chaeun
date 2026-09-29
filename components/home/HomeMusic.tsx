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
  const [showTracks, setShowTracks] = useState(false);
  const track = tracks[selected];
  const playlist = [...tracks.slice(selected), ...tracks.slice(0, selected)];

  return (
    <aside className={styles.music} aria-label="채운 배경음악">
      {open && (
        <div id="home-music-player" className={styles.panel}>
          <div className={styles.heading}>
            <span>♫</span>
            <button className={styles.listToggle} aria-expanded={showTracks} aria-controls="home-music-tracks" onClick={() => setShowTracks(!showTracks)}>{showTracks ? '목록 접기 −' : '곡 선택 +'}</button>
            <button onClick={() => setOpen(false)} aria-label="배경음악 정지하고 닫기">×</button>
          </div>
          <div id="home-music-tracks" hidden={!showTracks} className={styles.tracks} role="group" aria-label="배경음악 곡 선택">
            {tracks.map((item, index) => (
              <button key={item.id} aria-pressed={selected === index} onClick={() => { setSelected(index); setShowTracks(false); }}>
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

        </div>
      )}
      {!open && <button
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={open ? 'home-music-player' : undefined}
        onClick={() => { setShowTracks(false); setOpen(true); }}
      >
        <span aria-hidden="true">♫</span>
        음악 켜기
      </button>}
    </aside>
  );
}
