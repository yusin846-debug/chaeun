import type { Chart } from '@/lib/consultation/saju';
import s from './Conversation.module.css';
import b from './ElementBeads.module.css';
export function ElementBead({element,uncertain=false}:{element:string;uncertain?:boolean}){return <i aria-hidden="true" className={b.bead} data-uncertain={uncertain} style={{backgroundPosition:`${['목','화','토','금','수'].indexOf(element)*25}% center`}}/>;}
function duration(months:number,roundUp=false) { const total=roundUp?Math.ceil(months):Math.floor(months); return `${Math.floor(total/12)}년 ${total%12}개월`; }
export function ElementChart({chart}:{chart:Chart}) {
 return <div className={b.collection} aria-label="천간과 지지 본기의 오행 개수">{chart.elementRanges.map(e=><div className={b.row} key={e.element} aria-label={`${e.element} ${e.min===e.max?e.min:`${e.min}에서 ${e.max}`}개`}><span className={b.label}>{e.element}</span><div className={b.tray}>{Array.from({length:e.max},(_,j)=><ElementBead key={j} element={e.element} uncertain={j>=e.min}/>)}{e.max===0&&<span className={b.empty}>—</span>}</div><b>{e.min===e.max?e.min:`${e.min}–${e.max}`}</b></div>)}<small>구슬 하나 = 원국 한 글자 · {chart.unknownTime?'시주 제외':'여덟 글자 기준'}<br/>강약 점수가 아닌 오행 개수예요.{chart.elementRanges.some(e=>e.min!==e.max)&&' 옅은 구슬은 출생 시간에 따라 달라지는 부분이에요.'}</small></div>;
}
export function ChartCard({chart}:{chart:Chart}) {
 return <div className={s.chart}><span className={s.eyebrow}>YOUR INNER LANDSCAPE</span><h2>나를 이루는 기운</h2><p className={s.caption}>양력 {chart.solarDate}</p>
 {chart.candidates.map((v,i)=><div key={i}>{chart.candidates.length>1&&<small>가능한 원국 {i+1}</small>}<div className={s.pillars}>{v.pillars.map((p,j)=><div key={j}><small>{['연주','월주','일주','시주'][j]}</small><b>{p?.hanja??'—'}</b><span>{p?.korean??'시간 모름'}</span></div>)}</div></div>)}
 <ElementChart chart={chart}/>
 <details><summary>대운 흐름 보기</summary>{chart.luck.map((l,i)=><div className={s.luck} key={i}><p>{chart.luck.length>1?`후보 ${i+1} · `:''}{l.forward?'순행':'역행'} · 첫 대운 약 {duration(l.startMonths[0])}{chart.unknownTime?` ~ ${duration(l.startMonths[1],true)}`:''} 후</p><ol>{l.pillars.slice(0,8).map((p,j)=><li key={j}><b>{p}</b><span>{l.startAge[0]+j*10}{l.startAge[0]!==l.startAge[1]?`–${l.startAge[1]+j*10}`:''}세~</span></li>)}</ol><small>대운수는 연 단위 반올림한 표시예요.</small></div>)}</details>
 {chart.uncertainties.map(t=><p className={s.caption} key={t}>{t}</p>)}
 <details><summary>계산 기준</summary><p className={s.caption}>입춘·절입 · 자정 기준<br/>{chart.policy.time}<br/>{chart.policy.luck}<br/>명리 해석은 자기 이해를 위한 참고로 읽어주세요.</p></details>
 </div>;
}
