'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { BrandShell } from './BrandShell';
import { BirthIntake } from './BirthIntake';
import { ConsultationTransition, prepareConsultationScene } from '../consultation/ConsultationTransition';
import { GameConversation } from '../consultation/GameConversation';
import { getSession, serverSnapshot, subscribe, setSession, getStorageWarning, type Session } from '@/lib/consultation/storage';
import { replySchema, topicSchema, type Birth } from '@/lib/consultation/schema';
import { openingReply } from '@/lib/consultation/opening';
import type { Chart } from '@/lib/consultation/saju';

async function post(path: string, data: unknown, signal: AbortSignal) {
 const response = await fetch(`/api/consultation/${path}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data), signal });
 const body = await response.json();
 if (!response.ok) throw new Error(body.error || '연결을 확인하고 다시 시도해주세요.');
 return body;
}
export function ConsultationEntry({topic}:{topic?:string}) {
 const session=useSyncExternalStore(subscribe,getSession,serverSnapshot);
 const currentBirth=session?.birth;
 const [chart,setChart]=useState<Chart|null>(null);
 const [editing,setEditing]=useState(false);
 const [busy,setBusy]=useState(false);
 const [entering,setEntering]=useState(false);
 const [error,setError]=useState('');
 const [warning,setWarning]=useState('');
 const controller=useRef<AbortController|null>(null);
 const requesting=useRef(false);
 const topicIntent=topicSchema.safeParse(topic??'');
 const entryTopic=topicIntent.success?topicIntent.data:'';

 useEffect(()=>{
  if (!currentBirth) return;
  const request=new AbortController();
  post('chart',currentBirth,request.signal).then(data=>setChart(data.chart)).catch(err=>{if(!request.signal.aborted)setError(err.message)});
  return ()=>request.abort();
 },[currentBirth]);
 useEffect(()=>()=>controller.current?.abort(),[]);

 async function ask(current:Session) {
  if(requesting.current||!current.topic||!current.messages.length) return;
  requesting.current=true;setBusy(true);setError('');
  const request=new AbortController();controller.current=request;
  try {
   const data=await post('chat',{birth:current.birth,preferredName:current.preferredName,topic:current.topic,messages:current.messages},request.signal);
   const reply=replySchema.parse(data.reply);
   if(request.signal.aborted)return;
   setSession({...current,messages:[...current.messages,{id:crypto.randomUUID(),role:'assistant',reply}]});
   setWarning(getStorageWarning());
  } catch(err) { if(!request.signal.aborted)setError(err instanceof Error?err.message:'다시 한 번 연결해볼게.'); }
  finally { if(controller.current===request){setBusy(false);requesting.current=false;controller.current=null;} }
 }
 async function begin(birth:Birth) {
  if(requesting.current)return;
  setBusy(true);setEntering(true);setError('');requesting.current=true;
  const request=new AbortController();controller.current=request;
  try {
   const [data]=await Promise.all([post('chart',birth,request.signal),prepareConsultationScene(request.signal)]);
   if(request.signal.aborted)return;
   const next:Session={version:1,birth,topic:entryTopic,messages:[]};
   setChart(data.chart);setSession(next);setEditing(false);setWarning(getStorageWarning());
   window.scrollTo({top:0,behavior:'instant'});
   requesting.current=false;setBusy(false);setEntering(false);controller.current=null;
  }catch(err){if(!request.signal.aborted){setError(err instanceof Error?err.message:'출생 정보를 확인해주세요.');requesting.current=false;setBusy(false);setEntering(false);}}
 }
 function chooseTopic(selected:Session['topic'],concern?:string) {
  if(!session||busy||requesting.current||session.messages.length||!selected)return;
  if(selected==='free'&&!concern?.trim())return;
  const next:Session={...session,topic:selected,messages:[{id:crypto.randomUUID(),role:'assistant',reply:openingReply(selected,session.preferredName)}]};
  if(concern?.trim())next.messages.push({id:crypto.randomUUID(),role:'user',text:concern.trim()});
  setSession(next);setError('');setWarning(getStorageWarning());
  if(concern?.trim())void ask(next);
 }
 function send(text:string,selected=session?.topic??'') {
  if(!session||busy||!text.trim()||text.trim().length>2000)return;
  if(session.messages.length===0||session.messages.at(-1)?.role==='user')return;
  const history=session.messages.length>=119?[session.messages[0],...session.messages.slice(-98)]:session.messages;
  const next:Session={...session,topic:selected||'free',messages:[...history,{id:crypto.randomUUID(),role:'user',text:text.trim()}]};
  setSession(next);void ask(next);
 }
 function reset(edit:boolean) {
  controller.current?.abort();controller.current=null;requesting.current=false;
  const oldBirth=session?.birth;
  setSession(edit&&oldBirth?{version:1,birth:oldBirth,topic:entryTopic,messages:[]}:null);
  setEditing(edit);setChart(null);setBusy(false);setError('');
 }
 if(entering)return <ConsultationTransition/>;
 return !session||editing?<BrandShell><BirthIntake initial={session?.birth??null} topic={entryTopic} onSubmit={begin} pending={busy} error={error}/></BrandShell>:<GameConversation session={session} chart={chart} busy={busy} error={error} warning={warning||getStorageWarning()} onRetry={()=>void ask(session)} onSend={send} onChooseTopic={chooseTopic} onName={name=>{if(session&&!session.messages.length)setSession({...session,preferredName:name.trim()});}} onReset={reset}/>;
}
