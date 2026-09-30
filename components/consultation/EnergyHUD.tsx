import type { Chart } from '@/lib/consultation/saju';
import { ElementBead } from './ChartCard';
import s from './EnergyHUD.module.css';
export function EnergyHUD({chart,support,onOpen}:{chart:Chart|null;support:string[];onOpen:()=>void}){
 return <button type="button" className={s.hud} onClick={onOpen} aria-label="내 사주 · 오행 상태 자세히 보기"><span className={s.title}>내 사주<small aria-hidden="true">↗</small></span><span className={s.stats}>{(chart?.elementRanges??['목','화','토','금','수'].map(element=>({element,min:0,max:0}))).map(e=><span className={s.stat} key={e.element} data-supported={support.includes(e.element)} aria-label={`${e.element} ${chart?(e.min===e.max?e.min:`${e.min}~${e.max}`):'계산 중'}${support.includes(e.element)?', 공간 추천 기운':''}`}><ElementBead element={e.element}/><span>{e.element}<b>{chart?(e.min===e.max?e.min:`${e.min}–${e.max}`):'·'}</b></span>{support.includes(e.element)&&<em>보완</em>}</span>)}</span></button>;
}
