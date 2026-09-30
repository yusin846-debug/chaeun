/** Public environmental facts; the personal fit is an interpretation, not a measured outcome. */
export const neighborhoodCandidates=[
 {scope:'서울',name:'성수동 · 서울숲 가까이',facts:'서울숲은 한강과 중랑천이 만나는 곳의 녹지 축이다. 자연생태숲·습지생태원 등 네 테마 공원을 포함한다.',sourceUrl:'https://parks.seoul.go.kr/park/detailView.do?pIdx=5'},
 {scope:'전국',name:'강릉 · 경포호 주변',facts:'경포호 주변에는 호수와 습지 복원 환경이 있다. 열린 수변과 녹지 장면을 함께 비교할 수 있다.',sourceUrl:'https://www.gn.go.kr/tour/html/tour/sub01/sub01_06_10.html'},
] as const;

const giheungCandidates=[
 {scope:'서울',name:'수서동 · 수인분당선 주변',facts:'강남구 수서동 안내에 따르면 대모산과 탄천을 곁에 두며 지하철 3호선·수인분당선 등이 지나는 지역이다. 기흥 방면 이동과 자연 환경을 함께 비교할 후보이며, 정확한 직장 위치와 환승·셔틀 연결·주거비는 별도 확인해야 한다.',sourceUrl:'https://www.gangnam.go.kr/center/contents/center_greeting_3220065/1/view.do?mid=MC140501&office=3220065'},
 {scope:'전국',name:'용인 구갈동 · 기흥역 주변',facts:'기흥구청 공식 교통 안내에서 구갈동 소재 구청과 기흥역 접근을 확인할 수 있다. 기흥 생활권을 비교할 후보이며 직장이 기흥역 근처라는 뜻은 아니다. 실제 근무지와 교통 연결·주거비를 확인해야 한다.',sourceUrl:'https://www.giheunggu.go.kr/_lmth/01_info/info_0309.asp'},
] as const;

/** Commute intent takes priority over generic scenic recommendations. No name/birth routing. */
export function selectNeighborhoodCandidates(userTexts:string[]){
 const context=userTexts.join(' ');
 if(/기흥/.test(context)&&/출퇴근|출근|직장|근무|파견|통근/.test(context))return giheungCandidates;
 if(/출퇴근|출근|통근|직장.{0,10}가까/.test(context))return [];
 return neighborhoodCandidates;
}
