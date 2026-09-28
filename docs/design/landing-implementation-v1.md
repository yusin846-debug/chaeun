# 랜딩 구현 첫 버전

## 승인 범위

사용자의 ‘개발하면서 보자’ 지시에 따라 정적 목업 단계에서 웹 구현으로 전환했다. 이번 단위는 랜딩과 생년일시 입력 진입이다. 실제 사주 계산·펫 상담·풍수 생성·결제는 후속 단계다.

## 동작과 콘텐츠

- 첫 화면의 공감 이야기: 연애, 일과 시작, 돈 걱정, 혼자인 밤, 쉼과 불안, 취향과 로망. 상담 안의 여섯 고민 선택지와는 별개의 랜딩 탐색이다.
- 광고 연결: `/?concern=love`, `career`, `money`, `lonely`, `rest`, `taste`. 알 수 없는 값은 기본 이야기로 표시한다.
- 목차: 채운 → 공간 → 맞춤 아트 → 사주·풍수 → 사례 → 소품. 기본 앵커 이동과 현재 스크롤 위치의 aria-current를 연결한다.
- 여섯 태그는 형태와 호버/키보드 포커스 반응이 각각 다르다. 클릭/탭 시 눌림을 제공한다.
- 포인터의 빛 변화는 방 사진 안에만 적용한다. 모바일의 빛 위치는 스크롤과 연결한다. 모션 줄이기는 빛과 전환, 부드러운 스크롤을 해제한다.
- 추천 방 이미지 전환, 맞춤 액자 이미지, 사주·오행 설명, 근거가 구분된 국내 기업 사례와 실제 출처 링크, 마지막 소품 분위기 제안을 제공한다.
- 모든 시작 CTA는 /create의 생년일시 입력으로 연결한다. 기존 중간 소개 화면을 통과하지 않는다. 생년일시 단계의 뒤로가기는 랜딩으로 돌아간다.
- 랜딩에 앱 설치, 상담 펫, 구매 가격, 저장/공유 버튼은 표시하지 않는다.

## 미디어

public/images/landing/studio.png: 기존 생성 원룸 마스터.
public/images/landing/personal-art.png: 내장 image_gen으로 새로 생성한 현대적 추상 액자 연출. 개인 사용자의 실제 분석 결과가 아니다.
기존 space-bedroom.png 및 소품 사진을 보조 이미지로 사용한다.

아트 생성 프롬프트: A premium contemporary interior editorial photograph for Korean women in their twenties/thirties. Landscape 1536x1024. Close intimate still life of a large thin natural oak frame leaning on a pale low shelf in a real compact Korean studio. The framed art is exquisite minimalist abstract composition on ivory cotton paper: one imperfect terracotta sun circle upper left, two intersecting muted celadon organic hills, a hairline gold curving river. No typography, no traditional ink mountains, no glyphs. Beside frame a small mushroom shaped opaline lamp turned on, pale blue ceramic cup, one small branch in a matte cream vase. Natural soft afternoon light from unseen window left, tactile materials, rich yet understated styling. Frame and art take 65% of composition, sufficient negative space, realistic perspective. No text, no logos, no watermarks.

## 남은 작업 및 검증 한계

## 검증 결과

- TypeScript noEmit 검사 통과.
- 변경 TS/TSX 파일 ESLint 검사 통과.
- 프로덕션 빌드 통과 (Next 16.2.11). 초기 폰트 네트워크 제한과 빌드 워커의 node 경로 문제를 환경 설정으로 해결했다.
- 설문 완료 후 다시 시작하는 회귀 테스트 1건 통과. `test:reading` 명령으로 재실행 가능. 출생 정보는 보존하고 설문/결과/상품 상태는 초기화한다.
- 로컬 프로덕션 미리보기: http://127.0.0.1:3019
- 코드 리뷰: 재시작 시 진행 상태 초기화, 모바일 활성 태그 노출, 앵커 이동 중 강조 고정 문제를 발견하여 수정했다. 상세는 landing-review-v1.md.

## 남은 작업

설명 카드 → 도형 안 미디어 → 영상의 히어로 시퀀스와 구간별 짧은 영상은 아직 구현하지 않았다. 현재는 이미지와 실제 CSS 인터랙션으로 레이아웃을 검토하는 버전이다.
브라우저 도구는 관리자 보안 정책 확인 불가로 로컬 페이지 접근을 거부했다. 다른 브라우저 경로로 우회하지 않는다. 실제 데스크톱·모바일 렌더링, 태그 이동, CTA 클릭 검증은 아직 완료하지 못했다.
기존 /create의 입력 다음에는 이전 모의 분석 프로토타입이 남아 있다. 이번 작업의 완료 범위에 실제 분석·상담이 포함되지 않으며 공개 서비스 출시용으로 간주하지 않는다.
