import test from 'node:test';
import assert from 'node:assert/strict';
import { wantsNeighborhoods } from '../lib/consultation/relocation';
import { spaceInputSchema } from '../lib/consultation/space';
const input=spaceInputSchema.parse({neighborhood:'',layout:'shared',views:[],daylight:'unknown'});
test('legacy ordinary topics do not acquire unsolicited moving suggestions',()=>{
 for(const topic of ['money','career','love','rest','interior','free'])assert.equal(wantsNeighborhoods(input,topic),false);
 for(const topic of ['moving','firsthome'])assert.equal(wantsNeighborhoods(input,topic),true);
});
test('explicit relocation intent opts in from career and opts out from moving',()=>{
 assert.equal(wantsNeighborhoods({...input,recommendNeighborhoods:true},'career'),true);
 assert.equal(wantsNeighborhoods({...input,recommendNeighborhoods:false},'moving'),false);
});
