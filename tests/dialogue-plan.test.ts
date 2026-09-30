import test from 'node:test';
import assert from 'node:assert/strict';
import { dialoguePlan } from '../lib/consultation/dialogue-plan';
import type { Message } from '../lib/consultation/schema';
const user=(i:number):Message=>({id:String(i),role:'user',text:'상황 답변'});
const assistant:Message={id:'a',role:'assistant',reply:{bubbles:['이야기'],question:'이미 물었던 질문',mood:'warm',summary:null}};
test('successive answers change the question angle and stop exploration at checkpoint',()=>{
 assert.deepEqual([1,2,3,4,5].map(n=>dialoguePlan(Array.from({length:n},(_,i)=>user(i)),n>=5).phase),['wish','trigger','exception','resource','checkpoint']);
});
test('reading assistant pages does not advance question phase, and recent questions stay available',()=>{
 const result=dialoguePlan([assistant,user(1),assistant,assistant],false);
 assert.equal(result.phase,'wish');assert.deepEqual(result.recentQuestions,Array(3).fill('이미 물었던 질문'));
});
test('first response after checkpoint reflects on the summary instead of restarting the same question',()=>{
 const checkpoint:Message={...assistant,reply:{...assistant.reply,summary:{title:'정리',desire:'바람',strength:'강점',direction:'방향',elements:[]}}};
 assert.equal(dialoguePlan([user(1),user(2),user(3),user(4),checkpoint,user(5)],false).phase,'space');
});

test('guided later questions change angle instead of repeating the original concern',async()=>{
 const {guidedQuestion}=await import('../lib/consultation/dialogue-plan');
 for(const topic of ['love','career','money']){
  const questions=[2,3,4].map(n=>guidedQuestion(topic,Array.from({length:n},(_,i)=>user(i)),false));
  assert.equal(new Set(questions).size,3);assert.ok(questions.every(Boolean));
 }
 assert.equal(guidedQuestion('love',[user(1)],false),null);
 assert.equal(guidedQuestion('love',[user(1)],true),'지금 사는 곳은 어디야?');
});
