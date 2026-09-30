import test from 'node:test';
import assert from 'node:assert/strict';
import { dashboardReflection } from '../lib/consultation/dashboard-reflection';
test('dashboard headings frame next steps without exposing private relationship or work events',()=>{
 const love=dashboardReflection('love');
 assert.equal(love.title,'마음의 속도와 관계의 타이밍을 맞추는 중');
 for(const topic of ['love','money','career','moving','firsthome','unknown']){
  const copy=dashboardReflection(topic);
  assert.ok(copy.title.length<40);
  assert.doesNotMatch(copy.title+copy.body,/이미 연인|헤어|열등|숨을 막|취준|실직|우울/);
 }
});
