import test from 'node:test';
import assert from 'node:assert/strict';
import { sessionSchema, summaryDue } from '../lib/consultation/schema';
import { openingReply } from '../lib/consultation/opening';
import { roomVisual } from '../lib/consultation/room-visual';
import { spaceInputSchema } from '../lib/consultation/space';
const birth={date:'1995-01-01',time:'12:00',unknown:false,calendar:'solar',gender:'female'};
test('nickname survives restore without counting as a consultation answer',()=>{
 const session=sessionSchema.parse({version:1,birth,preferredName:'  별명  ',topic:'money',messages:[]});
 assert.equal(session.preferredName,'별명');assert.equal(summaryDue(session.messages),false);
 assert.match(openingReply('money',session.preferredName).bubbles[0],/별명/);
 assert.equal(sessionSchema.safeParse({...session,preferredName:'   '}).success,false);
 assert.equal(sessionSchema.safeParse({...session,preferredName:'x'.repeat(31)}).success,false);
});
test('explicit room preference survives restore and supplies its own image and objects',()=>{
 const files=new Set<string>();
 for(const roomStyle of ['vintage','pastel','gaming'] as const){
  const input=spaceInputSchema.parse({neighborhood:'',layout:'shared',views:[],daylight:'unknown',roomStyle});
  const restored=sessionSchema.parse({version:1,birth,topic:'career',messages:[],space:{input,dashboard:null,research:null}});
  const visual=roomVisual(restored.space!.input);files.add(visual.file);
  assert.equal(visual.key,roomStyle);assert.ok(visual.names.art);assert.ok(visual.meaning);
 }
 assert.equal(files.size,3);
});
