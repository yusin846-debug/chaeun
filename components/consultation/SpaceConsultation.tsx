'use client';
import { useEffect, useRef, useState } from 'react';
import { Daisy } from '../brand/Daisy';
import { setSession, type Session } from '@/lib/consultation/storage';
import { spaceDashboardSchema, neighborhoodResearchSchema, layoutLabels, viewLabels, type SpaceInput } from '@/lib/consultation/space';
import type { Chart } from '@/lib/consultation/saju';
import { JewelDashboard } from './JewelDashboard';
import s from './SpaceConsultation.module.css';
const empty:SpaceInput={neighborhood:'',layout:'unknown',views:[],daylight:'unknown'};
const daylightLabels={bright:'햇빛이 넉넉해',soft:'은은하게 들어와',dark:'조금 어두워',unknown:'잘 모르겠어'};
export function SpaceConsultation({session,chart}:{session:Session;chart:Chart|null}){
 const [step,setStep]=useState<'location'|'room'>(session.space?'room':'location');
 const [input,setInput]=useState<SpaceInput>(session.space?.input??{...empty,recommendNeighborhoods:['moving','firsthome'].includes(session.topic)});
 const [editing,setEditing]=useState(false);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 const controller=useRef<AbortController|null>(null);
 const resultRef=useRef<HTMLElement|null>(null);
 const dashboard=session.space?.dashboard;
 const research=session.space?.research;
 const checkpoint=[...session.messages].reverse().find(m=>m.role==='assistant'&&m.reply.summary);
 const summary=checkpoint?.role==='assistant'?checkpoint.reply.summary:null;
 useEffect(()=>()=>controller.current?.abort(),[]);
 useEffect(()=>{if(dashboard&&!editing)resultRef.current?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});},[dashboard,editing]);
 function saveInput(value:SpaceInput){setInput(value);setSession({...session,space:{input:value,dashboard:null,research:null}});}
 async function generate(){
  if(controller.current)return;
  const request=new AbortController();controller.current=request;setBusy(true);setError('');
  setSession({...session,space:{input,dashboard:null,research:null}});
  try{
   const response=await fetch('/api/consultation/space',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({birth:session.birth,preferredName:session.preferredName,topic:session.topic,messages:session.messages,space:input}),signal:request.signal});
   const body=await response.json();if(!response.ok)throw new Error(body.error||'다시 연결해줘.');
   const next=spaceDashboardSchema.parse(body.dashboard);const sources=neighborhoodResearchSchema.parse(body.research);
   if(request.signal.aborted)return;
   setSession({...session,space:{input,dashboard:next,research:sources}});setEditing(false);
  }catch(err){if(!request.signal.aborted)setError(err instanceof Error?err.message:'다시 연결해줘.');}
  finally{if(controller.current===request){controller.current=null;setBusy(false);}}
 }
 if(dashboard&&!editing)return <JewelDashboard resultRef={resultRef} dashboard={dashboard} topic={session.topic} input={input} research={research} chart={chart} summary={summary} onEdit={()=>{setEditing(true);setStep('location');}}/>;
 return <section className={s.intake} aria-label="내 공간 알아보기" aria-busy={busy}>
  <div className={s.kicker}><Daisy className={s.flower}/><span>슈슈와 공간 채우기 · {step==='location'?'1':'2'} / 2</span></div>
  {busy?<div className={s.loading} role="status"><Daisy className={s.loadingFlower}/><h2>네 기운이 머물 방을 그려보는 중</h2><p>동네와 방의 조건을 살펴보고, 너에게 어울리는 배치와 소재를 고르고 있어.</p></div>:<>
  {step==='location'?<form onSubmit={e=>{e.preventDefault();saveInput(input);setStep('room');}}><h2>지금 사는 곳은 어디야?</h2><p>시·구·동까지만 알려줘. 가까운 공원이나 물길도 함께 살펴볼게.</p><label className={s.srOnly} htmlFor="neighborhood">지금 사는 동네</label><input id="neighborhood" value={input.neighborhood} maxLength={80} placeholder="서울 송파구 방이동" autoComplete="off" onChange={e=>setInput({...input,neighborhood:e.target.value})}/><label style={{display:"flex",gap:10,alignItems:"center",marginTop:20}}><input style={{width:20,height:20}} type="checkbox" checked={input.recommendNeighborhoods??["moving","firsthome"].includes(session.topic)} onChange={e=>setInput({...input,recommendNeighborhoods:e.target.checked})}/>이사·자취를 생각 중이야. 다른 동네도 추천받을래.</label><div className={s.actions}><button type="submit" className={s.primary}>다음</button><button type="button" className={s.secondary} onClick={()=>{saveInput({...input,neighborhood:''});setStep('room');}}>동네는 건너뛸게</button></div></form>:<form onSubmit={e=>{e.preventDefault();void generate();}}><h2>너의 방은 어떤 모습이야?</h2><p>구조만 골라도 좋아. 풍경과 빛은 아는 만큼만 알려줘.</p>
   <fieldset><legend>방 구조</legend><div className={s.choices}>{Object.entries(layoutLabels).map(([value,label])=><button key={value} type="button" aria-pressed={input.layout===value} onClick={()=>saveInput({...input,layout:value as SpaceInput['layout']})}>{label}</button>)}</div></fieldset>
   <fieldset><legend>창밖에 보이는 것 <small>여러 개 선택 · 선택 안 해도 괜찮아</small></legend><div className={s.choices}>{Object.entries(viewLabels).map(([value,label])=><button key={value} type="button" aria-pressed={input.views.includes(value as SpaceInput['views'][number])} onClick={()=>{const view=value as SpaceInput['views'][number];saveInput({...input,views:input.views.includes(view)?input.views.filter(v=>v!==view):[...input.views,view]});}}>{label}</button>)}</div></fieldset>
   <fieldset><legend>낮의 밝기 <small>선택</small></legend><div className={s.choices}>{Object.entries(daylightLabels).map(([value,label])=><button key={value} type="button" aria-pressed={input.daylight===value} onClick={()=>saveInput({...input,daylight:value as SpaceInput['daylight']})}>{label}</button>)}</div></fieldset>
   <fieldset><legend>끌리는 공간의 결 <small>선택</small></legend><div className={s.choices}><button type="button" aria-pressed={!input.roomStyle||input.roomStyle==='auto'} onClick={()=>saveInput({...input,roomStyle:'auto'})}>내 조건에 맞춰 골라줘</button><button type="button" aria-pressed={input.roomStyle==='coastal'} onClick={()=>saveInput({...input,roomStyle:'coastal'})}>월넛·메탈·초록 · 모던 빈티지</button>{([['vintage','원목·네이비·체크 · 개발 책상'],['pastel','우드·파스텔 · 아늑한 복층'],['gaming','차콜·암막커튼 · 게임 공간']] as const).map(([value,label])=><button key={value} type="button" aria-pressed={input.roomStyle===value} onClick={()=>saveInput({...input,roomStyle:value})}>{label}</button>)}</div></fieldset>
   <label htmlFor="room-notes">계속 곁에 두고 싶은 것과 방의 취향 <small>선택</small></label><input id="room-notes" value={input.roomNotes??''} maxLength={600} placeholder="예: 부모님과 살고 내 방만 사용해. 카드형 미술작품을 많이 붙여뒀어." onChange={e=>setInput({...input,roomNotes:e.target.value})}/>
   <div className={s.actions}><button type="submit" className={s.primary}>내 방에 필요한 기운 채우기 <Daisy className={s.flower}/></button><button type="button" className={s.secondary} onClick={()=>setStep('location')}>동네 수정</button></div>
  </form>}
  {error&&<p role="alert" className={s.error}>{error} 아래 입력을 바꾸거나 같은 버튼으로 다시 시도할 수 있어.</p>}
  </>}
 </section>;
}
