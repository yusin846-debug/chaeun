import type { Reply } from './schema';
import type { Chart } from './saju';
/** Check mechanically verifiable claims; this does not validate divination itself. */
export function readingIssues(reply:Reply,chart:Chart,topic?:string){
 const text=[...reply.bubbles,reply.question,reply.summary?.strength??'',...(reply.summary?.blockages?.map(b=>b.flow)??[])].join(' ');
 const issues:string[]=[];
 if(reply.summary&&[reply.summary.desire,reply.summary.strength,reply.summary.direction].some(t=>/(싶은|할 수|될 수|때문에|그래서|하지만|하고|이며|있어서)$/.test(t.trim())))issues.push('요약 문장이 중간에 잘렸다. 각 필드를 160자 안쪽의 완결된 1~2문장으로 다시 쓴다.');
 if(reply.summary&&topic==='love'&&!/연애|관계|인연|상대|마음에 드는/.test(reply.summary.desire+' '+reply.summary.title))issues.push('중간 점검에서 원래 연애 주제가 사라졌다. 관계의 실제 상황과 원하는 인연을 중심에 두고 방 취향은 보완 단서로만 쓴다.');
 if(!chart.unknownTime&&/(여섯|6)\s*글자/.test(text))issues.push('출생시간이 확인된 원국은 여덟 글자다. 여섯 글자라고 설명하지 않는다.');
 if(chart.unknownTime&&/(여덟|8)\s*글자/.test(text))issues.push('생시 미상이며 확인한 원국은 여섯 글자다. 시주는 읽지 않는다.');
 if(reply.bubbles.some(b=>/[?？]/.test(b)))issues.push('bubbles에는 질문을 넣지 않는다. 모든 질문은 question 필드 하나에만 둔다.');
 const stems=chart.candidates.map(c=>c.dayMaster);
 for(const match of text.matchAll(/([갑을병정무기경신임계])([자축인묘진사오미신유술해])?\s*일간/g)){
  if(match[2]||!stems.includes(match[1] as typeof stems[number]))issues.push('일간은 천간 한 글자다. 계산된 dayMaster만 일간이라고 부른다. 두 글자는 일주다.');
 }
 return [...new Set(issues)];
}
