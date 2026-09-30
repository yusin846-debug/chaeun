import type { Message } from './schema';

/** Count only the current chapter; reading pages never consumes a question turn. */
export function dialoguePlan(messages:Message[],summary:boolean,topic?:string){
 const lastSummary=messages.reduce((index,message,i)=>message.role==='assistant'&&message.reply.summary?i:index,-1);
 const turns=messages.slice(lastSummary+1).filter(message=>message.role==='user').length;
 const phase=summary?'checkpoint':lastSummary>=0?'space':turns<=1?'wish':turns===2?'trigger':turns===3?'exception':turns===4?'resource':'checkpoint';
 const directions={
  wish:'바라는 변화: 답답한 상황은 이미 들었다. 그 상황이 좋아졌을 때 원하는 구체적인 경험 하나를 묻는다. 표현/확신 중 고르라는 추상적인 재분류는 하지 않는다.',
  trigger:'반복되는 막힘을 정의할 단서: 아직 알려지지 않은 구체적 상황이나 시점 하나를 묻는다. 이미 답한 감정이나 원하는 결과를 다시 고르게 하지 않는다.',
  exception:'환기: 문제를 더 캐묻지 말고, 최근 이 고민이 덜했던 순간이나 자신답게 편안했던 장면 하나로 시선을 바꾼다. 그런 순간이 없다는 답도 받아들인다.',
  resource:'회복의 단서: 이미 나온 상황과 바람을 다시 확인하지 않는다. 쉬는 시간·혼자 있는 공간·기분을 풀어주는 감각 중 아직 나오지 않은 구체적인 단서 하나를 묻고 중간 점검을 준비한다.',
  checkpoint:'질문 탐색 종료. 이번에는 중간 점검이다. 추가 고민 질문 없이 지금 사는 동네를 묻고 공간 단계로 넘긴다.',
  space:'고민 질문은 끝났다. 공간 입력 화면으로 넘기며 지금 사는 동네와 방 구조를 확인한다. 추가 감정 질문을 하지 않는다.',
 };
 const focuses:Record<string,string[]>={
 career:['일에서 얻고 싶은 변화 하나. 사용자가 동기를 이미 말했으면 다시 흥미를 나누지 말고 원하는 일상의 변화를 묻는다.','그 변화를 막는 실행 조건 하나: 시간·경험·보여줄 결과물. 이미 말한 출퇴근/직무 취향/이직 여부는 다시 선택시키지 않는다.','최근 끝까지 해내서 뿌듯했던 작은 경험 하나. 일·게임·운동 등 사용자가 말한 활동을 단서로 묻는다.','일이나 활동이 끝난 뒤 쉬는 공간에서 회복을 방해하거나 돕는 빛·소리·배치 하나.'],
 love:['엇갈림이 어떤 상황인지 아직 모르면 확인한다. 이미 알면 관계에서 바라는 변화 하나.','상대의 어떤 행동에서 편안함이나 신뢰를 느끼는지. 타이밍·미련·답답함을 다시 분류하지 않는다.','최근 관계와 무관하게 자신답고 편안했던 순간 하나. 현재 안정적이라는 답을 존중한다.','혼자 방에서 쉬거나 사람을 만난 뒤 돌아왔을 때 편해지는 감각이나 공간 하나.'],
 money:['벌고 싶은 방식이나 첫 실행에서 막히는 것 중 아직 모르는 하나. 직업 상태를 추측하지 않는다.','시작하기 어렵게 만드는 구체적인 조건 하나. 이미 알려준 완성도/비교/준비를 같은 선택지로 반복하지 않는다.','최근 작게라도 끝내거나 만들고 만족했던 경험 하나. 돈으로 평가하지 말고 강점을 발견한다.','작업하거나 쉬는 방에서 시선이 가는 물건·작품·빛 중 하나. 이미 방을 설명했으면 유지하고 싶은 것을 묻는다.'],
 };
 const focus=!summary&&turns>=1&&turns<=4?focuses[topic??'']?.[turns-1]:undefined;
 return {phase,answerCount:turns,direction:focus??directions[phase],recentQuestions:messages.filter(m=>m.role==='assistant').slice(-6).map(m=>m.reply.question)};
}

/** The later interview beats are authored so the model cannot loop on the same concern. */
export function guidedQuestion(topic:string,messages:Message[],summary:boolean):string|null{
 if(summary)return '지금 사는 곳은 어디야?';
 const turn=messages.filter(m=>m.role==='user').length;
 const questions:Record<string,string[]>={
  love:['상대의 어떤 행동에서 마음이 편해져? 약속을 지키는 모습, 솔직히 말하는 태도처럼 네 기준 하나만 골라도 좋아.','연애 생각을 잠깐 내려놓으면, 요즘 너답고 편안한 순간은 언제야? 사람들과 웃을 때나 혼자 좋아하는 걸 할 때도 좋아.','방에 돌아왔을 때 어떤 게 마음을 편하게 해줘? 좋아하는 물건, 따뜻한 빛, 조용히 쉬는 자리 중 떠오르는 게 있어?'],
  career:['그 방향으로 움직일 때 지금 더 필요한 건 시간이야, 경험이야, 아니면 보여줄 결과물이야? 이미 갖춘 건 빼고 하나만 꼽아봐.','최근 작게라도 끝까지 해내서 뿌듯했던 순간이 있어? 일에서 해결한 문제나 게임·운동에서 해낸 것도 좋아.','하루를 마치고 방에 돌아오면 쉬는 데 가장 중요한 건 뭐야? 빛 조절, 편한 잠자리, 작업과 쉬는 자리의 구분 중 골라도 좋아.'],
  money:['시작을 늦추는 건 만들 것을 고르는 일, 완성도를 높이는 일, 사람들에게 보여주는 일 중 어디에 가까워? 다른 이유여도 좋아.','돈이나 남의 평가를 잠깐 빼고, 최근 끝내서 스스로 마음에 들었던 일이 있어? 작은 작업이나 꾸준히 한 습관도 좋아.','작업하거나 쉬는 방에서 계속 곁에 두고 싶은 건 뭐야? 작품이나 사진, 좋아하는 색, 자주 쓰는 물건 중 하나만 알려줘.'],
 };
 if(turn<2||turn>4)return null;
 const last=messages.at(-1);
 if(turn===4&&last?.role==='user'&&/방|커튼|침대|조명/.test(last.text))return '말해준 방의 모습 중 꼭 남기고 싶은 것과 바꾸고 싶은 것이 있어? 물건 하나나 빛의 느낌 하나만 골라도 좋아.';
 return questions[topic]?.[turn-2]??null;
}
