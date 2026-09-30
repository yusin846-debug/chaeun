'use client';
import Link from 'next/link';
import { Daisy } from '../brand/Daisy';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { openingReply, topicOpeners } from '@/lib/consultation/opening';
import { consultationTopics } from '@/lib/consultation/topics';

import { ShushuHelper } from './ShushuHelper';
import { EnergyHUD } from './EnergyHUD';
import { SpaceConsultation } from './SpaceConsultation';
import { ChartCard, ElementChart, ElementBead } from './ChartCard';
import type { Session } from '@/lib/consultation/storage';
import type { Chart } from '@/lib/consultation/saju';
import type { Reply } from '@/lib/consultation/schema';
import s from './GameConversation.module.css';

type Props={session:Session;chart:Chart|null;busy:boolean;error:string;warning:string;onRetry:()=>void;onSend:(text:string,topic?:Session['topic'])=>void;onChooseTopic:(topic:Session['topic'],concern?:string)=>void;onName:(name:string)=>void;onReset:(edit:boolean)=>void};
type Panel='chart'|'history'|'summary'|'settings'|null;
const subscribeMotion=(fn:()=>void)=>{const m=window.matchMedia('(prefers-reduced-motion: reduce)');m.addEventListener('change',fn);return()=>m.removeEventListener('change',fn)};
const getMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const serverMotion=()=>true;
const greeting='안녕! 슈슈랑 어떤 주제로 이야기를 시작해볼까?\n요즘 관심사가 궁금해.';

function PanelDialog({title,onClose,children}:{title:string;onClose:()=>void;children:React.ReactNode}){
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const node=ref.current;node?.showModal();return()=>node?.close()},[]);
 return <dialog className={s.panel} ref={ref} onClose={onClose} aria-label={title}><header><button aria-label="닫기" onClick={()=>ref.current?.close()}>닫기 ×</button></header><h2>{title}</h2>{children}</dialog>;
}
function Portrait({state}:{state:'listen'|'talk'|'think'|'warm'}){
 return <div className={s.catPosition}><div className={s.catSprite} data-state={state} role="img" aria-label={{listen:'눈을 맞추며 듣는 고양이',talk:'이야기하는 고양이',think:'곰곰이 생각하는 고양이',warm:'다정하게 눈웃음 짓는 고양이'}[state]}/></div>;
}
function Scene({reply,busy,compact=false,gate=false,opening=false,summaryAvailable,onSummary,children}:{reply:Reply|null;busy:boolean;compact?:boolean;gate?:boolean;opening?:boolean;summaryAvailable:boolean;onSummary:()=>void;children:React.ReactNode}){
 const [page,setPage]=useState(0);
 const [shown,setShown]=useState(0);
 const reduced=useSyncExternalStore(subscribeMotion,getMotion,serverMotion);
 const pages=reply?(opening?[[...reply.bubbles,reply.question].join('\n')]:(reply.summary?reply.bubbles:[...reply.bubbles,reply.question])):[greeting];
 const text=busy?'음… 네 이야기를 조금 더 생각해볼게.':pages[page];
 const full=reduced||busy;
 const typing=!full&&shown<text.length;
 useEffect(()=>{
  if(full||shown>=text.length)return;
  const timer=window.setTimeout(()=>setShown(n=>Math.min(text.length,n+2)),28);
  return()=>window.clearTimeout(timer);
 },[text,full,shown]);
 const lastPage=page===pages.length-1;
 useEffect(()=>{
  if(gate||busy||!reply||typing||lastPage)return;
  function handleEnter(event:KeyboardEvent){
   if(event.key!=='Enter'||event.repeat||event.isComposing||event.shiftKey||event.ctrlKey||event.altKey||event.metaKey||event.defaultPrevented)return;
   const target=event.target;
   if(document.querySelector('dialog[open]')||(target instanceof Element&&target.closest('input,textarea,select,button,a,[contenteditable="true"],[role="textbox"]')))return;
   event.preventDefault();
   setPage(p=>p+1);setShown(0);
  }
  window.addEventListener('keydown',handleEnter);
  return()=>window.removeEventListener('keydown',handleEnter);
 },[gate,busy,reply,typing,lastPage]);
 const state=busy?'think':typing?'talk':reply?.mood==='warm'?'warm':'listen';
 function advance(){if(gate||busy||!reply||typing||lastPage)return;setPage(p=>p+1);setShown(0)}
 if(compact)return <><ShushuHelper onSummary={onSummary}/><div className={s.resultArea}>{children}</div></>;
 return <>
 <div className={s.scene}>
  <div className={s.sceneShade}/>

  <Portrait state={state}/>

  {summaryAvailable&&<button className={s.noteBadge} onClick={onSummary}><Daisy className={s.flower}/> 중간 점검</button>}

 </div>
 <section className={s.dialogue} aria-label="고양이의 대사">
  <div className={s.nameplate}><Daisy className={s.flower}/> 슈슈</div>
  <div className={s.dialogueText} aria-live="polite" aria-atomic="true"><span className={s.srOnly}>{text}</span><p aria-hidden="true">{full?text:text.slice(0,shown)}{typing&&<i className={s.caret}/>}</p></div>
  {!gate&&!busy&&reply&&!typing&&!lastPage&&<footer className={s.nextOnly}><button className={s.advance} aria-keyshortcuts="Enter" onClick={advance}>다음 →</button></footer>}
 </section>
 {(gate||(!busy&&lastPage&&!typing))&&<div className={s.inputArea}>{children}</div>}
 </>;
}
export function GameConversation({session,chart,busy,error,warning,onRetry,onSend,onChooseTopic,onName,onReset}:Props){
 const [panel,setPanel]=useState<Panel>(null);

 const [draft,setDraft]=useState('');
 const [nameDraft,setNameDraft]=useState('');
 const [selected,setSelected]=useState(session.topic);
 const gate=session.messages.length===0;
 const naming=gate&&!session.preferredName;
 const [confirm,setConfirm]=useState<'clear'|'edit'|null>(null);
 const input=useRef<HTMLTextAreaElement>(null);
 const latest=[...session.messages].reverse().find(m=>m.role==='assistant');
 const summaryMessage=[...session.messages].reverse().find(m=>m.role==='assistant'&&m.reply.summary);
 const summary=summaryMessage?.role==='assistant'?summaryMessage.reply.summary:null;
 const opening=session.messages.length===1&&latest?.role==='assistant'&&!!session.topic;
 const reply:Reply|null=summary?{bubbles:['이제 너의 기운을 다시 북돋게 해줄 방법에 대해서 고민해볼게.'],question:'지금 사는 곳은 어디야?',mood:'warm',summary}:opening?openingReply(session.topic,session.preferredName):latest?.role==='assistant'?latest.reply:null;
 const waiting=!summary&&(session.messages.at(-1)?.role==='user'||!reply);

 function send(text:string,topic?:Session['topic']){if(busy||waiting||!text.trim())return;onSend(text,topic);setDraft('')}
 return <main className={s.game} id="main-content">
  <header className={s.toolbar}><Link href="/" className={s.logo} aria-label="채운 홈">chaeun<span>✳</span></Link><nav aria-label="상담 메뉴"><EnergyHUD chart={chart} support={session.space?.dashboard?.energy.map(e=>e.element)??[]} onOpen={()=>setPanel('chart')}/><button onClick={()=>setPanel('history')}>대화 기록</button><button aria-label="상담 설정" onClick={()=>setPanel('settings')}>☷</button></nav></header>
  <div className={s.gameBody}>
   <h1 className={s.srOnly}>슈슈와 나누는 나의 이야기</h1>
   {warning&&<p role="status" className={s.warning}>{warning}</p>}
   <Scene compact={!!session.space?.dashboard} key={latest?.id??(naming?'name':'topic')} reply={gate?{bubbles:[],question:naming?'안녕, 나는 사주와 공간의 이야기를 이어주는 슈슈야.\n이름이나 별명, 뭐라고 불러주면 좋을까?':`${session.preferredName}, 슈슈랑 어떤 주제로 이야기를 시작해볼까?\n요즘 관심사가 궁금해.`,mood:'hello',summary:null}:reply} busy={busy} gate={gate} opening={opening} summaryAvailable={!!summary} onSummary={()=>setPanel('summary')}>
    {naming?<form className={s.topicGate} onSubmit={e=>{e.preventDefault();if(nameDraft.trim())onName(nameDraft.trim())}}><label htmlFor="preferred-name">슈슈가 부를 이름</label><input id="preferred-name" aria-label="슈슈가 부를 이름" autoComplete="nickname" maxLength={30} value={nameDraft} onChange={e=>setNameDraft(e.target.value)} style={{padding:18,borderRadius:16,border:"1px solid #c9cdb9",fontSize:20,background:"#fffdf1",color:"#30382a"}}/><button className={s.startTopic} disabled={!nameDraft.trim()}>이렇게 불러줘 <Daisy className={s.flower}/></button></form>:gate?<div className={s.topicGate}>
     <div className={s.topicGrid}>{consultationTopics.map(t=><button key={t.id} data-topic={t.id} style={{backgroundImage:`url(/images/consultation/topics/${t.id}-paint-v1.png)`}} aria-pressed={selected===t.id} onClick={()=>setSelected(t.id)}><span className={s.topicLabel}>{t.label}</span>{selected===t.id&&<Daisy className={s.topicSelected}/>}</button>)}</div>
     {selected==='free'&&<textarea aria-label="나누고 싶은 고민" placeholder="지금 네 마음에 있는 이야기를 들려줘…" value={draft} maxLength={2000} onChange={e=>setDraft(e.target.value)}/>}
     <button className={s.startTopic} disabled={!selected||busy||(selected==='free'&&!draft.trim())} onClick={()=>{onChooseTopic(selected,selected==='free'?draft:undefined);setDraft('')}}>이 이야기로 시작하기 <Daisy className={s.flower}/></button>
    </div>:<>
    {error&&<div className={s.error} role="alert"><p>{error}</p><button disabled={busy} onClick={onRetry}>다시 연결하기</button></div>}
    {!busy&&!error&&waiting&&<button className={s.reconnect} onClick={onRetry}>답변 다시 불러오기</button>}
    {opening&&!busy&&!waiting&&<div className={s.replyHints} aria-label="이야기 시작하기">{(topicOpeners[session.topic]?.options??[]).map(option=><button key={option} onClick={()=>send(option)}>{option}</button>)}</div>}
    {!busy&&!waiting&&!error&&!session.space?.dashboard&&reply?.summary&&<section className={s.checkpoint} aria-label="중간 점검">
     <div className={s.checkpointHeading}><span>YOUR CURRENT FLOW · 지금의 흐름</span></div>
     <h2>{reply.summary.title}</h2>{reply.summary.blockages?.map(b=><div className={s.blockage} key={b.title}><span>보완할 상태</span><strong>{b.title}</strong><p>{b.experience}</p><small>{b.flow}</small></div>)}
     <div className={s.checkpointSteps}><article><span>01 · 지금 너의 마음</span><p>{reply.summary.desire}</p></article><article><span>02 · 사주로 읽은 흐름</span><p>{reply.summary.strength}</p></article><article><span>03 · 함께 채워볼 기운</span><p>{reply.summary.direction}</p>{reply.summary.elements.length>0&&<div className={s.energyTags}>{reply.summary.elements.map(el=><b key={el}><ElementBead element={el}/>{el}</b>)}</div>}</article></div>

    </section>}
    {!!summary&&!busy&&<SpaceConsultation session={session} chart={chart}/>}
    {!summary&&!busy&&!waiting&&!error&&<form className={s.composer} onSubmit={e=>{e.preventDefault();send(draft)}}><label htmlFor="my-story" className={s.srOnly}>슈슈에게 답하기</label><div><textarea ref={input} id="my-story" rows={1} maxLength={2000} placeholder="슈슈에게 이야기해줘…" value={draft} disabled={busy||waiting} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing&&window.matchMedia('(min-width: 761px)').matches){e.preventDefault();send(draft)}}}/><button type="submit" disabled={busy||waiting||!draft.trim()}>보내기 <Daisy className={s.flower}/></button></div></form>}
    </>}
   </Scene>

  </div>
  {panel&&<PanelDialog title={{chart:'나를 이루는 기운',history:'우리가 나눈 이야기',summary:'중간 점검',settings:'이 방의 설정'}[panel]} onClose={()=>{setPanel(null);setConfirm(null)}}>
   {panel==='chart'&&(chart?<ChartCard chart={chart}/>:<p>원국을 펼치는 중이에요.</p>)}
   {panel==='history'&&<div className={s.transcript}>{session.messages.length===0&&<p>이제 첫 페이지를 함께 써볼까요?</p>}{session.messages.map(m=><article key={m.id} data-speaker={m.role}><span>{m.role==='user'?'너의 이야기':'슈슈'}</span>{m.role==='user'?<p>{m.text}</p>:<>{m.reply.bubbles.map((b,i)=><p key={i}>{b}</p>)}<p>{m.reply.question}</p>{m.reply.summary&&<button onClick={()=>setPanel('summary')}>마음의 노트 · {m.reply.summary.title}</button>}</>}</article>)}</div>}
   {panel==='summary'&&summary&&<article className={s.summary}><h3>{summary.title}</h3>{chart&&<ElementChart chart={chart}/>}<dl><dt>지금 너의 마음</dt><dd>{summary.desire}</dd><dt>사주로 읽은 흐름</dt><dd>{summary.strength}</dd><dt>더 채우고 싶은 기운</dt><dd>{summary.direction}</dd></dl></article>}
   {panel==='settings'&&<div className={s.settings}><p>사주와 AI의 이야기는 나를 이해하는 참고예요. 상담은 이 기기에 저장되며, 아래에서 지울 수 있어요.</p><p>출생 정보를 바꾸면 새 원국으로 상담을 다시 시작해요.</p><button onClick={()=>setConfirm('edit')}>출생 정보 수정하기</button><button onClick={()=>setConfirm('clear')}>이 기기의 상담 지우기</button>{confirm&&<div role="alert"><p>{confirm==='clear'?'저장된 생년일시·성별·대화를 모두 지울까요?':'기존 대화를 지우고 출생 정보를 수정할까요?'}</p><button onClick={()=>onReset(confirm==='edit')}>{confirm==='clear'?'모두 지우기':'수정하고 다시 시작'}</button><button onClick={()=>setConfirm(null)}>취소</button></div>}</div>}
  </PanelDialog>}
 </main>;
}
