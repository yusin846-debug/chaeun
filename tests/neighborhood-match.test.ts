import {test} from 'node:test';
import assert from 'node:assert/strict';
import {neighborhoodMatch} from '../lib/consultation/neighborhood-match';
const research={text:'주거지 가까이 공원과 하천이 있어요.',sources:[{title:'지역 안내',url:'https://example.org/park'}],verified:true};
test('no evidence never produces an invented compatibility score',()=>{
 assert.equal(neighborhoodMatch(null,[{element:'목',meaning:'성장'}]),null);
 assert.equal(neighborhoodMatch({...research,verified:false},[{element:'목',meaning:'성장'}]),null);
 assert.equal(neighborhoodMatch({...research,text:'확인하지 못했어요.'},[{element:'목',meaning:'성장'}]),null);
});
test('symbolic index follows its disclosed rule and respects selected supporting elements',()=>{
 const match=neighborhoodMatch(research,[{element:'목',meaning:'성장'},{element:'화',meaning:'표현'}]);
 assert.equal(match?.score,70);assert.equal(match?.matched,1);assert.equal(match?.total,2);
 assert.equal(neighborhoodMatch(research,[{element:'수',meaning:'흐름'}])?.score,90);
});

test('candidate neighborhood features do not inflate the current neighborhood score',()=>{
 const research={verified:true,text:'현재 동네에는 주거 아파트가 있다. [비교 후보] 다른 지역에는 공원과 호수가 있다.',sources:[{title:'source',url:'https://example.com'}]};
 const result=neighborhoodMatch(research,[{element:'목',meaning:'growth'}]);
 assert.equal(result?.score,50);
 assert.deepEqual(result?.features.map(f=>f.element),['토']);
});
