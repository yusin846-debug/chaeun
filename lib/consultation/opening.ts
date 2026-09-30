import type { Message, Reply } from './schema';

export const topicOpeners: Record<string,{lead:string;options:string[]}> = {
 lonely:{lead:'혼자인 밤이 마음에 걸리는구나.',options:['집에 오면 허전해','사람들과 있어도 외로워','혼자 있는 시간이 어려워']},
 love:{lead:'연애 쪽이 궁금하구나.',options:['다가오는 사람은 있는데 마음이 안 가','마음에 드는 사람과는 상황이 엇갈려','앞으로 어떤 사람을 만날지 궁금해']},
 career:{lead:'일과 다음 시작, 지금 어디가 가장 궁금해?',options:['지금 생각한 방향이 나와 맞는지','빠르게 배우는 걸 내 실력으로 만들고 싶어','다음 도전이나 이직의 시점이 궁금해']},
 money:{lead:'돈 이야기를 조금 해볼까?',options:['돈을 벌 기회가 생겼으면 좋겠어','버는 만큼 잘 모으고 싶어','앞으로의 생활이 막막해']},
 rest:{lead:'마음이 편히 쉬었으면 좋겠구나.',options:['쉬어도 생각이 많아','앞일이 불안해','요즘 쉽게 지쳐']},
 taste:{lead:'네가 좋아하는 것들 속에서 너를 찾아보자.',options:['자꾸 눈길 가는 방이 있어','마음에 든 가구가 있어','내 취향을 잘 모르겠어']},
 neighborhood:{lead:'너와 잘 맞는 동네가 궁금하구나.',options:['지금 동네가 편하지 않아','마음에 둔 동네가 있어','나에게 맞는 동네를 찾고 싶어']},
 interior:{lead:'방을 좀 더 너답게 바꾸고 싶구나.',options:['가구 배치가 고민이야','색이나 소품을 고르고 싶어','방 전체를 새롭게 꾸미고 싶어']},
 moving:{lead:'이사를 생각하고 있구나.',options:['어느 동네로 갈지 고민이야','두 집 사이에서 고민이야','언제 옮길지 고민이야']},
 firsthome:{lead:'너만의 첫 공간을 준비하고 있구나.',options:['첫 자취방을 찾는 중이야','작은 방을 꾸미고 싶어','혼자 사는 게 설레고 걱정돼']},
 free:{lead:'좋아, 지금 네 마음에 있는 이야기로 시작하자.',options:['관계 때문에 마음이 복잡해','앞으로의 선택이 고민이야','집이나 생활을 바꾸고 싶어']},
};
export const situationQuestions: Record<string,string> = Object.fromEntries(Object.entries(topicOpeners).map(([topic,{options}])=>[topic,`${options.join(', ')} 중 어떤 이야기에 가까워? 다른 이야기여도 좋아.`]));
export function openingReply(topic: string, preferredName?: string): Reply {
 const opening=topicOpeners[topic]??topicOpeners.free;
 return {bubbles:[`${preferredName ? `${preferredName}, ` : ''}${opening.lead}`],question:situationQuestions[topic]??situationQuestions.free,mood:'curious',summary:null};
}
export function canRequestReply(topic:string,messages:Message[]) {
 return !!topic && messages.length>0 && messages.at(-1)?.role==='user' && messages.every((m,i)=>m.role===(i%2===0?'assistant':'user'));
}
