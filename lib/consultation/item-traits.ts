import type { roomVisual } from './room-visual';
import type { SpaceDashboard } from './space';
type Room = ReturnType<typeof roomVisual>['key'];
type Kind = SpaceDashboard['objects'][number]['kind'];
type Element = '목'|'화'|'토'|'금'|'수';
// Design references in the selected room, not verified manufacturing specifications.
const materials:Record<Room,Record<Kind,string>>={
 collector:{art:'잉크블루 · 실버 프레임',light:'크롬 · 오팔 유리',plant:'초록 잎 · 작은 화분',fabric:'블루 쿠션 · 리넨',tray:'옅은 블루 · 유리'},
 vintage:{art:'바다 풍경 · 원목 프레임',light:'메탈 · 방향 조절형',plant:'초록 잎 · 원목 수납장',fabric:'네이비 코튼 · 버건디 체크',tray:'조개 모양 · 밝은 곡면'},
 pastel:{art:'두 곡선 · 밝은 원목 프레임',light:'오팔빛 · 둥근 갓',plant:'초록 잎 · 작은 화분',fabric:'말차 · 라벤더 체크',tray:'세라믹 · 둥근 형태'},
 gaming:{art:'산과 새벽 · 짙은 프레임',light:'오팔빛 · 따뜻한 간접광',plant:'초록 잎 · 작은 화분',fabric:'차콜 · 암막 패브릭',tray:'펠트 · 칸이 나뉜 수납'},
 coastal:{art:'수평선 · 월넛 프레임',light:'알루미늄 · 버건디',plant:'초록 잎 · 메탈 선반',fabric:'화이트 코튼 · 올리브',tray:'크림 세라믹 · 조개 형태'},
 separate:{art:'블루 추상화 · 밝은 프레임',light:'유리 · 구형 갓',plant:'초록 잎 · 작은 화분',fabric:'블루그레이 · 부드러운 결',tray:'크림색 · 원형'},
 studio:{art:'곡선 추상화 · 원목 프레임',light:'버건디 · 버섯 형태',plant:'초록 잎 · 실내 나무',fabric:'살구빛 · 조개 형태',tray:'실버 · 반사되는 표면'},
};
const artElements:Record<Room,Element[]>={collector:['수','금'],vintage:['수','목'],pastel:['목','화'],gaming:['토','화'],coastal:['수','목'],separate:['수'],studio:['목','토']};
const meanings:Record<Element,string>={목:'생기',화:'온기',토:'안정',금:'정돈',수:'유연함'};
export function itemTraits(room:Room,kind:Kind){
 const elements:Element[]=kind==='art'?artElements[room]:kind==='light'?['화']:kind==='plant'?['목']:kind==='fabric'?(room==='gaming'?['수']:['토']):room==='collector'?['수']:room==='studio'?['금']:['토'];
 const role=kind==='art'?'시선이 머무는 자리':kind==='light'?'작업과 휴식의 빛 나누기':kind==='plant'?'작은 초록 포인트':kind==='fabric'?(room==='gaming'?'아침빛과 외부 시선 조절':'몸에 닿는 편안한 촉감'):'흩어진 소지품 정리';
 return {material:materials[room][kind],elements:elements.map(element=>({element,meaning:meanings[element]})),role};
}
