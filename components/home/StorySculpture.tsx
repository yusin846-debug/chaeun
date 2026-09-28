"use client";

import { useState } from "react";
import styles from "./StorySculpture.module.css";

const captions: Record<string, string> = {
  lonely: "혼자의 시간에도, 따뜻한 궤도를.",
  love: "서로의 마음이 가까워지는 순간.",
  career: "나의 속도로, 다음 장면으로.",
  money: "작은 여유가 차곡차곡 쌓이도록.",
  rest: "마음의 파도가 잔잔해질 때까지.",
  taste: "좋아하는 모양으로 나를 채우는 일.",
};

/** One native vector scene at a time: no layered photographs or external video. */
export function StorySculpture({ topic }: { topic: string }) {
  const [paused, setPaused] = useState(false);
  return <div className={`${styles.stage} ${styles[topic]} ${paused ? styles.paused : ""}`}>
    <span className={styles.index}>THE SHAPE OF YOUR FEELING</span>
    <div className={styles.scene} key={topic}>
      <svg viewBox="0 0 500 440" role="img" aria-label={captions[topic]}>
        <defs>
          <linearGradient id="sculpture-pearl" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff8df"/><stop offset=".46" stopColor="#d8ddc8"/><stop offset="1" stopColor="#647d70"/></linearGradient>
          <linearGradient id="sculpture-red" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f4aa9e"/><stop offset=".4" stopColor="#b55a43"/><stop offset="1" stopColor="#612b29"/></linearGradient>
          <linearGradient id="sculpture-gold" x1="0" y1="0" x2=".7" y2="1"><stop stopColor="#f5e2ae"/><stop offset=".5" stopColor="#b89b62"/><stop offset="1" stopColor="#6b583a"/></linearGradient>
          <radialGradient id="sculpture-glow"><stop stopColor="#f6f4ee" stopOpacity=".15"/><stop offset="1" stopColor="#f6f4ee" stopOpacity="0"/></radialGradient>
        </defs>
        <circle cx="250" cy="225" r="210" fill="url(#sculpture-glow)"/>
        <ellipse cx="250" cy="390" rx="130" ry="15" fill="#000" opacity=".17"/>
        {topic === "lonely" && <g><ellipse cx="250" cy="230" rx="208" ry="83" fill="none" stroke="#87a99a" strokeWidth="1" transform="rotate(-27 250 230)"/><g className={styles.float}><path d="M286 89a133 133 0 1 0 79 237A122 122 0 0 1 286 89Z" fill="url(#sculpture-pearl)"/><circle cx="340" cy="126" r="36" fill="url(#sculpture-gold)"/></g><circle className={styles.satellite} cx="92" cy="289" r="13" fill="#b55a43"/></g>}
        {topic === "love" && <g><ellipse cx="250" cy="225" rx="217" ry="155" fill="none" stroke="#b55a43" strokeWidth="1"/><g className={styles.heartLeft}><path d="M0 30C-68-22-90-59-66-88C-45-113-10-98 0-78C10-98 45-113 66-88C90-59 68-22 0 30Z" fill="url(#sculpture-red)" transform="translate(185 252) rotate(-18) scale(1.32)"/></g><g className={styles.heartRight}><path d="M0 30C-68-22-90-59-66-88C-45-113-10-98 0-78C10-98 45-113 66-88C90-59 68-22 0 30Z" fill="url(#sculpture-pearl)" transform="translate(338 302) rotate(20) scale(.98)"/></g><path className={styles.spark} d="M267 105v24m-12-12h24M383 169v16m-8-8h16" stroke="#e5cf96" strokeWidth="3" strokeLinecap="round"/></g>}
        {topic === "career" && <g><path d="M66 337H150V265H234V193H318V121H403" fill="none" stroke="#87a99a" strokeWidth="2"/><g className={styles.rise}><path d="M132 276 278 130H211V79H363V231H312V165L168 312Z" fill="url(#sculpture-pearl)"/><path d="M168 312 181 327 326 182 312 165Z" fill="#506f60"/><circle cx="380" cy="323" r="37" fill="url(#sculpture-gold)"/></g></g>}
        {topic === "money" && <g className={styles.float}>{[0,1,2,3].map(i=><g key={i} transform={`translate(0 ${-i*50})`}><path d="M126 320v26c0 44 248 44 248 0v-26" fill={i%2 ? "#718d7f" : "#8b754e"}/><ellipse cx="250" cy="320" rx="124" ry="38" fill={i%2 ? "url(#sculpture-pearl)" : "url(#sculpture-gold)"}/></g>)}<path d="M250 95V55m0 22c-28 0-38-14-38-28 28 0 38 14 38 28m0-10c25 0 37-13 37-28-26 0-37 14-37 28" fill="#87a99a" stroke="#87a99a" strokeWidth="3"/></g>}
        {topic === "rest" && <g>{[0,1,2,3].map(i=><ellipse key={i} className={styles.ripple} style={{animationDelay:`${i*.6}s`}} cx="250" cy="287" rx={70+i*43} ry={23+i*18} fill="none" stroke="#87a99a" strokeWidth="1.5"/>)}<g className={styles.float}><ellipse cx="250" cy="231" rx="93" ry="48" fill="url(#sculpture-pearl)"/><ellipse cx="257" cy="175" rx="60" ry="36" fill="url(#sculpture-gold)"/><ellipse cx="247" cy="132" rx="36" ry="25" fill="url(#sculpture-pearl)"/></g></g>}
        {topic === "taste" && <g className={styles.mobile}><path d="M250 39v63M99 137 250 102 401 137M99 137v70m302-70v72m-151-107v159" fill="none" stroke="#d8ddd6" strokeWidth="2"/><circle cx="99" cy="252" r="48" fill="url(#sculpture-red)"/><path d="M203 350v-46a47 47 0 0 1 94 0v46Z" fill="url(#sculpture-pearl)"/><path d="m401 207 61 61-61 61-61-61Z" fill="url(#sculpture-gold)"/></g>}
      </svg>
    </div>
    <p>{captions[topic]}</p>
    <button className={styles.pause} onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "움직임 재생" : "움직임 멈추기"}</button>
  </div>;
}
