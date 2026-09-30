import test from 'node:test';
import assert from 'node:assert/strict';
import { selectNeighborhoodCandidates } from '../lib/consultation/neighborhood-candidates';
test('explicit Giheung commute uses relevant transport candidates, not generic seaside options',()=>{
 const candidates=selectNeighborhoodCandidates(['기흥까지 출퇴근해서 직장 가까이 이사도 생각해']);
 assert.equal(candidates.length,2);
 assert.ok(candidates.some(c=>c.name.includes('기흥')));
 assert.ok(candidates.every(c=>!c.name.includes('강릉')));
});
test('unknown commute destination cannot receive unrelated relocation candidates',()=>{
 assert.deepEqual(selectNeighborhoodCandidates(['출퇴근이 길어서 자취할까 해']),[]);
 assert.equal(selectNeighborhoodCandidates(['녹지가 있는 동네로 이사하고 싶어']).length,2);
});
