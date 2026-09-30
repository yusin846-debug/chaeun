import {test} from 'node:test';
import assert from 'node:assert/strict';
import {canRequestReply,openingReply,situationQuestions} from '../lib/consultation/opening';
import {generatedReplySchema,replySchema,summaryDue,sessionSchema,type Message} from '../lib/consultation/schema';
test('every topic starts with a valid situation question, not a reading',()=>{
 for(const topic of Object.keys(situationQuestions))assert.equal(replySchema.parse(openingReply(topic)).summary,null);
});
test('topic and an actual user answer are required before requesting a reading',()=>{
 const assistant:Message={id:'a',role:'assistant',reply:openingReply('love')};
 const user:Message={id:'u',role:'user',text:'좋아하는 사람이 있어'};
 assert.equal(canRequestReply('love',[]),false);
 assert.equal(canRequestReply('love',[assistant]),false);
 assert.equal(canRequestReply('',[assistant,user]),false);
 assert.equal(canRequestReply('love',[user]),false);
 assert.equal(canRequestReply('love',[assistant,user]),true);
 assert.equal(canRequestReply('free',[assistant,user]),true);
});
test('topic confirmation does not count as a user exchange; fifth real answer triggers summary',()=>{
 const messages:Message[]=[];
 for(let i=0;i<5;i++){
 messages.push({id:`a${i}`,role:'assistant',reply:openingReply('love')});
 assert.equal(summaryDue(messages),false);
 messages.push({id:`u${i}`,role:'user',text:'내 상황'});
 assert.equal(summaryDue(messages),i===4);
 }
});
test('legacy unselected-topic conversations remain readable',()=>{
 assert.equal(sessionSchema.safeParse({version:1,birth:{date:'1995-01-01',time:'12:00',calendar:'solar',unknown:false,gender:'female'},topic:'',messages:[{id:'a',role:'assistant',reply:openingReply('free')}]}).success,true);
});

test('moving and first home are persisted topics with distinct situation questions',()=>{
 for(const topic of ['moving','firsthome','interior']){
  assert.equal(sessionSchema.safeParse({version:1,birth:{date:'1995-01-01',time:'12:00',calendar:'solar',unknown:false,gender:'female'},topic,messages:[]}).success,true);
  assert.notEqual(openingReply(topic).question,openingReply('free').question);
 }
 assert.notEqual(openingReply('moving').question,openingReply('firsthome').question);
});

test('each opening supplies concrete conversational footholds on the first turn',()=>{
 for(const topic of Object.keys(situationQuestions)){
  const reply=openingReply(topic);
  assert.notEqual(reply.bubbles[0],'좋아. 네 이야기부터 들려줘.');
  assert.ok(reply.question.includes('다른 이야기여도 좋아'));
  assert.ok(reply.question.split(', ').length>=3);
 }
 assert.match(openingReply('love').question,/다가오는.*상황이 엇갈려.*어떤 사람/);
});

test('new checkpoints require named blockages while stored legacy checkpoints remain valid',()=>{
 const old={...openingReply('love'),summary:{title:'summary',desire:'wish',strength:'strength',direction:'direction',elements:[]}};
 assert.equal(replySchema.safeParse(old).success,true);
 assert.equal(generatedReplySchema.safeParse(old).success,false);
 assert.equal(generatedReplySchema.safeParse({...old,summary:{...old.summary,blockages:[{title:'Hesitation',experience:'Hesitation to speak',flow:'Expression',element:null}]}}).success,true);
});
