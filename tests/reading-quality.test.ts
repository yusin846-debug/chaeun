import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateChart } from '../lib/consultation/saju';
import { readingIssues } from '../lib/consultation/reading-quality';
import { openingReply } from '../lib/consultation/opening';
const chart=calculateChart({date:'1995-01-01',time:'12:00',calendar:'solar',gender:'female',unknown:false});
test('known time cannot be described as six characters and day pillar is not day master',()=>{
 const reply={...openingReply('love'),bubbles:['지금 확인한 여섯 글자에서 임자 일간이 보여.']};
 assert.equal(readingIssues(reply,chart).length,2);
});
test('one question lives in the question field, not duplicated in bubbles',()=>{
 const reply={...openingReply('love'),bubbles:['어떤 쪽이야?']};assert.equal(readingIssues(reply,chart).length,1);
 assert.deepEqual(readingIssues({...reply,bubbles:[`${chart.candidates[0].dayMaster} 일간으로 읽어볼 수 있어.`]},chart),[]);
});
