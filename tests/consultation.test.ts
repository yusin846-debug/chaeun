import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateChart } from '../lib/consultation/saju';
import { summaryDue, type Birth, type Message } from '../lib/consultation/schema';
const base:Birth={date:'2024-02-10',time:'12:00',calendar:'solar',unknown:false,gender:'female'};
const chart=(overrides:Partial<Birth>={})=>calculateChart({...base,...overrides});
test('KASI lunar new year and leap month conversion fixtures',()=>{
 assert.equal(chart().candidates[0].pillars[2]?.korean,'갑진');
 assert.equal(chart({calendar:'lunar',date:'2024-01-01'}).solarDate,'2024-02-10');
 assert.equal(chart({calendar:'lunar-leap',date:'2023-02-01'}).solarDate,'2023-03-22');
 assert.equal(chart({date:'2024-03-10'}).candidates[0].pillars[2]?.korean,'계유');
});
test('ipchun and gyeongchip change year/month at the Korean boundary',()=>{
 const a=chart({date:'2024-02-04',time:'17:26'}).candidates[0];
 const b=chart({date:'2024-02-04',time:'17:28'}).candidates[0];
 assert.equal(a.pillars[0]?.korean,'계묘');assert.equal(b.pillars[0]?.korean,'갑진');
 assert.notEqual(a.pillars[1]?.korean,b.pillars[1]?.korean);
 const c=chart({date:'2024-03-05',time:'11:22'}).candidates[0];
 const d=chart({date:'2024-03-05',time:'11:24'}).candidates[0];
 assert.notEqual(c.pillars[1]?.korean,d.pillars[1]?.korean);
});
test('midnight policy keeps 23:00 day and changes at 00:00',()=>{
 assert.equal(chart({time:'23:59'}).candidates[0].pillars[2]?.korean,'갑진');
 assert.equal(chart({date:'2024-02-11',time:'00:00'}).candidates[0].pillars[2]?.korean,'을사');
});
test('invalid calendars, future dates, missing sex and invalid time are rejected',()=>{
 assert.throws(()=>chart({date:'2023-02-29'}));
 assert.throws(()=>chart({date:'2024-02-01',calendar:'lunar-leap'}));
 assert.throws(()=>chart({date:'2099-01-01'}));
 assert.throws(()=>chart({time:'25:30'}));
 assert.throws(()=>chart({gender:undefined}));
});
test('unknown time excludes hour, retains term-boundary candidates and luck ranges',()=>{
 const c=chart({date:'2024-02-04',time:'',unknown:true});
 assert.equal(c.candidates.length,2);
 assert.ok(c.candidates.every(v=>v.pillars[3]===null));
 assert.ok(c.candidates.every(v=>Object.values(v.counts).reduce((a,b)=>a+b,0)===6));
 assert.ok(c.luck.length>1);
 const normal=chart({time:'',unknown:true});
 assert.equal(normal.candidates.length,1);
 assert.ok(normal.luck[0].startMonths[1]>normal.luck[0].startMonths[0]);
});
test('sex reverses luck direction for a yang year',()=>{
 assert.equal(chart().luck[0].forward,false);
 assert.equal(chart({gender:'male'}).luck[0].forward,true);
});
test('Korean summer time is normalized and missing/repeated hours are rejected',()=>{
 const dst=chart({date:'1988-06-01',time:'10:30'});
 assert.equal(dst.candidates[0].pillars[3]?.branch,'사'); // Standard 09:30
 assert.throws(()=>chart({date:'1988-05-08',time:'02:30'}));
 assert.throws(()=>chart({date:'1988-10-09',time:'02:30'}));
});
test('summary occurs after five answers and does not restart the interview after a summary',()=>{
 const reply={bubbles:['반가워'],question:'어떤 하루였어?',mood:'warm' as const,summary:null};
 const m:Message[]=[{id:'0',role:'assistant',reply}];
 for(let i=0;i<4;i++){m.push({id:'u'+i,role:'user',text:'이야기'});m.push({id:'a'+i,role:'assistant',reply});}
 assert.equal(summaryDue(m),false);
 m.push({id:'u4',role:'user',text:'다섯 번째 이야기'});assert.equal(summaryDue(m),true);
 m.push({id:'s',role:'assistant',reply:{...reply,summary:{title:'정리',desire:'바람',strength:'강점',direction:'방향',elements:['목']}}});
 m.push({id:'next',role:'user',text:'계속 이야기할래'});assert.equal(summaryDue(m),false);
});
