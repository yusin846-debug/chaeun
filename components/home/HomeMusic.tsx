'use client';

import { useRef, useState } from 'react';
import styles from './HomeMusic.module.css';

export function HomeMusic() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function toggleMusic() {
    const player = audio.current;
    if (!player) return;
    if (!player.paused) {
      player.pause();
      return;
    }
    setError(false);
    setLoading(true);
    player.volume = 0.3;
    try {
      await player.play();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className={styles.music} aria-label="채운 배경음악">
      <audio
        ref={audio}
        src="/audio/der-feder-waltzer.mp3"
        preload="none"
        loop
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => { setPlaying(false); setLoading(false); setError(true); }}
      />
      {error && <p className={styles.error} role="status">음악을 불러오지 못했어요. 다시 눌러주세요.</p>}
      <button
        className={styles.toggle}
        aria-pressed={playing}
        aria-busy={loading}
        disabled={loading}
        title="Mikkel Adler — Der Feder Waltzer"
        onClick={toggleMusic}
      >
        <span aria-hidden="true">{playing ? 'Ⅱ' : '♫'}</span>
        {loading ? '불러오는 중' : playing ? '음악 끄기' : '음악 켜기'}
      </button>
    </aside>
  );
}
