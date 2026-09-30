import { test } from 'node:test';
import assert from 'node:assert/strict';
import { guard, readBody, HttpError } from '../lib/consultation/http';
import { chatSchema, replySchema } from '../lib/consultation/schema';
test('same origin uses public Host even when Next request URL has internal hostname',()=>{
 assert.doesNotThrow(()=>guard(new Request('http://localhost:3019/api/consultation/chat',{method:'POST',headers:{origin:'http://127.0.0.1:3019',host:'127.0.0.1:3019','content-type':'application/json'}})));
 assert.throws(()=>guard(new Request('http://localhost:3019/api/consultation/chat',{method:'POST',headers:{origin:'https://unrelated.example',host:'127.0.0.1:3019','content-type':'application/json'}})),HttpError);
});
test('body reader enforces actual byte size and invalid JSON',async()=>{
 await assert.rejects(()=>readBody(new Request('http://localhost',{method:'POST',body:'x'.repeat(150001)})),(e:unknown)=>e instanceof HttpError&&e.status===413);
 await assert.rejects(()=>readBody(new Request('http://localhost',{method:'POST',body:'{invalid'})),(e:unknown)=>e instanceof HttpError&&e.status===400);
});
test('model output rejects invalid element and request rejects forged chart data',()=>{
 assert.equal(replySchema.safeParse({bubbles:['안녕'],question:'어때?',mood:'warm',summary:{title:'정리',desire:'바람',strength:'강점',direction:'방향',elements:['unknown']}}).success,false);
 assert.equal(chatSchema.safeParse({birth:{date:'1998-04-17',time:'',unknown:true,calendar:'solar',gender:'female'},topic:'love',messages:[],chart:{dayMaster:'forged'}}).success,false);
});
