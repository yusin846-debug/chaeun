import test from 'node:test';
import assert from 'node:assert/strict';
import { sessionSchema, summaryDue } from '../lib/consultation/schema';
import { openingReply } from '../lib/consultation/opening';
import { roomVisual, resolveRoomInput, needsRoomRematch } from '../lib/consultation/room-visual';
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

test('automatic participant presets match all four rooms for every layout and survive restore',()=>{
 const cases=[['승혜','진승혜','collector-bedroom-v1'],['유민','이유민','yumin-vintage-developer-v2'],['윤지','강윤지','yunji-pastel-loft-v1'],['현우','김현우','hyunwoo-gaming-room-v1']];
 for(const [nickname,fullName,file] of cases)for(const preferredName of [nickname,fullName])for(const layout of ['studio','shared','separate','unknown'] as const){
  const input=spaceInputSchema.parse({neighborhood:'',layout,views:[],daylight:'unknown',roomStyle:'auto'});
  const resolved=resolveRoomInput(input,preferredName);
  const restored=sessionSchema.parse({version:1,birth,preferredName,topic:'career',messages:[],space:{input:resolved,dashboard:null,research:null}});
  assert.equal(roomVisual(restored.space!.input).file,file);
  assert.deepEqual(roomVisual(restored.space!.input).names,roomVisual(resolved).names);
  assert.equal(needsRoomRematch(restored.space!.input,preferredName),false);
 }
});
test('explicit taste overrides participant presets, including coastal in a separate room',()=>{
 for(const roomStyle of ['collector','vintage','pastel','gaming','coastal'] as const){
  const input=spaceInputSchema.parse({neighborhood:'',layout:'separate',views:[],daylight:'unknown',roomStyle});
  assert.equal(roomVisual(resolveRoomInput(input,'현우')).key,roomStyle);
  assert.equal(needsRoomRematch(input,'현우'),false);
 }
});
test('legacy mismatches need new inventory and copy; unknown names retain layout fallback',()=>{
 const input=spaceInputSchema.parse({neighborhood:'',layout:'shared',views:[],daylight:'unknown'});
 assert.equal(needsRoomRematch(input,'현우'),true);
 assert.equal(needsRoomRematch(input,'유민'),true);
 assert.equal(needsRoomRematch(input,'윤지'),true);
 assert.equal(needsRoomRematch(input,'승혜'),false);
 for(const name of ['다른 사람','현우친구','constructor',undefined])assert.deepEqual(resolveRoomInput(input,name),input);
 assert.equal(roomVisual(resolveRoomInput(input,' 김현우 ')).key,'gaming');
});
