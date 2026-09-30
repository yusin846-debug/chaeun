'use client';
import { Daisy } from '../brand/Daisy';
import s from './ConsultationTransition.module.css';

/** Prepare both CSS images before mounting the room. Abort also clears the timer. */
export async function prepareConsultationScene(signal: AbortSignal) {
 const assets=['/images/consultation/quiet-room-v1.png','/images/consultation/cat-expressions-v2.png'];
 await new Promise<void>((resolve,reject)=>{
  let finished=false;
  let minimum=false;
  let loaded=false;
  const images:HTMLImageElement[]=[];
  const cleanup=()=>{clearTimeout(minTimer);clearTimeout(maxTimer);signal.removeEventListener('abort',abort);images.forEach(image=>{image.onload=null;image.onerror=null;});};
  const finish=()=>{if(finished)return;finished=true;cleanup();resolve();};
  const abort=()=>{if(finished)return;finished=true;cleanup();reject(new DOMException('Aborted','AbortError'));};
  const ready=()=>{if(minimum&&loaded)finish();};
  const minTimer=setTimeout(()=>{minimum=true;ready();},1200);
  const maxTimer=setTimeout(finish,4000);
  signal.addEventListener('abort',abort,{once:true});
  if(signal.aborted){abort();return;}
  void Promise.all(assets.map(src=>new Promise<void>(done=>{
   const image=new Image();images.push(image);image.onload=()=>done();image.onerror=()=>done();image.src=src;
  }))).then(()=>{loaded=true;ready();});
 });
}
export function ConsultationTransition(){
 return <main className={s.transition} aria-busy="true"><div role="status"><div className={s.orbit}><Daisy className={s.flower}/></div><h1>슈슈의 방으로 가는 중</h1><p>네 이야기를 나눌 자리를 준비하고 있어.</p></div></main>;
}
