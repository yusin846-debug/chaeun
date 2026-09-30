import test from 'node:test';
import assert from 'node:assert/strict';
import { sessionSchema, summaryDue, type Message } from '../lib/consultation/schema';
import { spaceInputSchema, neighborhoodResearchSchema } from '../lib/consultation/space';
const birth={date:'1995-01-01',time:'',calendar:'solar',unknown:true,gender:'female'};
const input={neighborhood:'서울 송파구 방이동',layout:'studio',views:['buildings','green'],daylight:'soft'};
test('optional space state preserves older sessions and restores an unfinished room form',()=>{
 const old={version:1,birth,topic:'love',messages:[]};assert.equal(sessionSchema.safeParse(old).success,true);
 const saved=sessionSchema.parse({...old,space:{input,dashboard:null,research:null}});assert.deepEqual(saved.space?.input,input);
});
test('room intake supports skip and multiple views, rejects unknown layout and unsafe citations',()=>{
 assert.equal(spaceInputSchema.safeParse({...input,neighborhood:'',views:[]}).success,true);
 assert.equal(spaceInputSchema.safeParse({...input,layout:'castle'}).success,false);
 assert.equal(neighborhoodResearchSchema.safeParse({text:'x',verified:true,sources:[{title:'x',url:'javascript:alert(1)'}]}).success,false);
});
test('existing checkpoints never restart the question loop even with many later answers',()=>{
 const messages:Message[]=[{id:'s',role:'assistant',reply:{bubbles:['정리'],question:'동네?',mood:'warm',summary:{title:'정리',desire:'바람',strength:'강점',direction:'방향',elements:[]}}}];
 for(let i=0;i<8;i++)messages.push({id:String(i),role:'user',text:'답변'});
 assert.equal(summaryDue(messages),false);
});
