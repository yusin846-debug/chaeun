'use client';
import { useState } from 'react';
import type { Birth } from '@/lib/consultation/schema';

import { getTopic } from './content';
import s from './Brand.module.css';
import c from './ConsultationEntry.module.css';
export function BirthIntake({initial,topic,onSubmit,pending,error}:{initial:Birth|null;topic?:string;onSubmit:(birth:Birth)=>void;pending:boolean;error:string}){
 const birth=initial;
 const selected=topic??'';
 const [gender,setGender]=useState<Birth['gender']|''>(birth?.gender??'');
 const [date,setDate]=useState(birth?.date??'');const [hour,setHour]=useState(birth?.time ? String(Number(birth.time.split(':')[0]) % 12 || 12) : '');
 const [minute,setMinute]=useState(birth?.time?.split(':')[1]??'');
 const [period,setPeriod]=useState(birth?.time ? (Number(birth.time.split(':')[0]) >= 12 ? 'pm' : 'am') : '');
 const time = hour && minute && period ? `${String(Number(hour)%12+(period==='pm'?12:0)).padStart(2,'0')}:${minute}` : '';
 const [calendar,setCalendar]=useState<Birth['calendar']>(birth?.calendar??'solar');const [unknown,setUnknown]=useState(birth?.unknown??false);
 const label=getTopic(selected)?.label??(selected==='neighborhood'?'동네 궁합':'나의 이야기');
 const completed = Number(Boolean(date)) + Number(Boolean(time) || unknown) + Number(Boolean(gender));
 return <section className={`${s.consult} ${c.intake}`}><span className={s.sectionLabel}>A MOMENT ABOUT YOU <span>{label}</span></span><div className={c.welcome}><div><h1>A little more<br/><strong>about you.</strong></h1><p>당신의 이야기가 피어나는 시간.<br/>태어난 날부터 가볍게 시작해볼까요?</p></div><div className={c.flower} aria-hidden="true"><svg viewBox="0 0 120 120">{Array.from({length:12},(_,i)=><ellipse key={i} cx="60" cy="30" rx="9" ry="23" fill="#faf7ef" transform={`rotate(${i*30} 60 60)`}/>)}<circle cx="60" cy="60" r="20" fill="#e8bb55"/><circle cx="55" cy="56" r="2" fill="#665339"/><circle cx="66" cy="56" r="2" fill="#665339"/><path d="M54 65q6 6 12 0" fill="none" stroke="#665339" strokeWidth="2" strokeLinecap="round"/></svg><span>Nice to meet you.</span></div></div>
 <form className={c.card} onSubmit={e=>{e.preventDefault();if(gender)onSubmit({date,time:unknown?'':time,calendar,unknown,gender})}}>
 <div className={c.cardTop}><span>YOUR FIRST CHAPTER</span><span>{completed}/3 <span className={c.dots} aria-hidden="true"><i data-filled={completed>0}/><i data-filled={completed>1}/><i data-filled={completed>2}/></span></span></div>
 <fieldset className={c.calendar}><legend>어떤 달력으로 기억하고 있나요?</legend><div>{[['solar','양력'],['lunar','음력'],['lunar-leap','음력 윤달']].map(([value,title])=><label key={value}><input type="radio" name="calendar" value={value} checked={calendar===value} onChange={()=>setCalendar(value as Birth['calendar'])}/><span>{title}</span></label>)}</div></fieldset>
 <label className={c.field}><span><b>01</b> 태어난 날</span><input type={calendar==='solar'?'date':'text'} placeholder="YYYY-MM-DD" pattern={calendar==='solar'?undefined:'[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|30)'} title={calendar==='solar'?undefined:'음력 생일을 YYYY-MM-DD 형식으로 입력해주세요.'} required value={date} max={calendar==='solar'?new Date().toLocaleDateString('sv-SE'):undefined} onChange={e=>setDate(e.target.value)}/>{calendar!=='solar'&&<small>음력 날짜를 1998-03-21처럼 적어주세요.</small>}</label>
 <fieldset className={c.timeGroup}><legend><b>02</b> 태어난 시간</legend>
 <label className={c.unknown}><input type="checkbox" checked={unknown} onChange={e=>setUnknown(e.target.checked)}/><span>시간을 몰라요</span></label>
 <div className={c.timeControls} data-disabled={unknown}>
 <div className={c.period} role="group" aria-label="오전 또는 오후">{[['am','오전'],['pm','오후']].map(([value,title])=><label key={value}><input type="radio" name="birth-period" value={value} required={!unknown} disabled={unknown} checked={period===value} onChange={()=>setPeriod(value)}/><span>{title}</span></label>)}</div>
 <div className={c.timeSelects}><label><span>시</span><select aria-label="태어난 시" required={!unknown} disabled={unknown} value={hour} onChange={e=>setHour(e.target.value)}><option value="" disabled>몇 시</option>{Array.from({length:12},(_,i)=><option key={i+1} value={i+1}>{i+1}시</option>)}</select></label><span className={c.colon} aria-hidden="true">:</span><label><span>분</span><select aria-label="태어난 분" required={!unknown} disabled={unknown} value={minute} onChange={e=>setMinute(e.target.value)}><option value="" disabled>몇 분</option>{Array.from({length:60},(_,i)=><option key={i} value={String(i).padStart(2,'0')}>{String(i).padStart(2,'0')}분</option>)}</select></label></div>
 </div>
 <p className={c.timeSummary} aria-live="polite">{unknown?'태어난 시간 없이 진행할게요.':time?`${period==='am'?'오전':'오후'} ${hour}시 ${Number(minute)}분 · ${time}${hour==='12' && minute==='00' ? period==='am'?' (자정)':' (정오)':''}`:'오전·오후를 고른 뒤, 시와 분을 선택해주세요.'}</p>
 <small className={c.timeHelp}>밤 12시는 오전, 낮 12시는 오후예요. 분까지 기억나지 않으면 ‘시간을 몰라요’를 선택해주세요.</small>
 </fieldset>
 <fieldset className={c.calendar}><legend>03 · 대운 계산에 사용할 성별</legend><div>{([['female','여성'],['male','남성']] as const).map(([value,title])=><label key={value}><input type="radio" name="gender" required value={value} checked={gender===value} onChange={()=>setGender(value)}/><span>{title}</span></label>)}</div><small className={c.timeHelp}>전통 명리의 대운 순행·역행 계산에만 사용해요.</small></fieldset>
 {error&&<p role="alert" className={c.error}>{error}</p>}
 <button className={c.continue} type="submit" disabled={pending}>{pending?'나의 원국을 펼치는 중…':'나의 기운 북돋으로 가기'}</button>
 <p className={c.privacy}>이 기기에 생년일시·성별·대화를 저장해 이어갈 수 있어요.<br/>상담을 시작하면 해석에 필요한 사주 정보와 대화가 OpenAI로 전달돼요.<br/>‘상담 지우기’로 이 기기의 정보를 삭제할 수 있어요. 공용 기기에서는 이용 후 지워주세요.</p>
 </form><p className={c.prototype}>한국 출생 · 1920년 이후 · 입춘·절입 / 자정 기준<br/>출생 당시 한국 법정시를 표준시로 보정해요. 명리 해석은 나를 돌아보는 참고로 활용해주세요.</p></section>;
}
