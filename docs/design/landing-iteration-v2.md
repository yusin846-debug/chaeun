# 랜딩 두 번째 구현

2026-09-28 사용자 요청: 오늘의집 감도의 여성 20–30대 취향 소품, 액막이 고양이, 기업 로고, 동네 궁합 점수/맞춤 인테리어의 명확한 소개, 스크롤 연동 주제 카드와 주제별 이미지.

## 수용 기준

- 채운 구간에서 스크롤에 따라 혼자인 밤→연애→일과 시작→돈 걱정→쉼과 불안→취향과 로망 순서로 카드와 이미지가 동시에 바뀐다. 역스크롤도 반대 순서로 동작한다. 태그 선택으로 원하는 주제로 즉시 이동 가능하다.
- 채운 구간의 긴 스크롤 동안 왼쪽 목차는 채운을 가리킨다. 모바일은 카드 위/이미지 아래 배치와 수평 주제 선택을 제공한다. 모션 줄이기는 전환 애니메이션을 제거한다.
- 동네 궁합 점수와 인테리어 추천의 결과 형식을 별도 두 카드로 소개한다. 개인정보 입력 이전에 가짜 개인 점수를 표시하지 않는다. 미입력 점수는 ? / 100이며 입력 후 확인 안내를 제공한다. 실제 점수 계산은 후속 사주/풍수 단계다.
- 소품은 액막이 고양이, 버섯 조명, 화병, 패브릭으로 구성한다. 인기 순위/리뷰/가격을 만들어 넣지 않는다. 실제 쇼핑 상품 연동 이전의 큐레이션 비주얼이다.
- 사례 내부에 SK·삼성·현대 로고를 사용한다. 기존 보도/연구 구분과 원문 링크를 유지한다.

## 리서치/미디어 출처

오늘의집 소품 스타일링 참고: https://ohou.se/productions/1822090/used_card?deal_id=1822090 (버섯 조명, 곡선 거울, 쿠션 등). 이는 특정 인구집단의 판매 순위 근거가 아니다.

- SK 공식 로고: https://www.sk.com/lib/images/desktop/logo.png
- 현대 공식 로고: https://www.hyundai.com/content/dam/hyundai/kr/ko/images/common/h1-logo.png ; CI 안내 https://www.hyundai.com/kr/ko/info/ci
- 삼성 원본 출처 표기 로고: https://commons.wikimedia.org/wiki/File:Samsung_Electronics_logo_(english).svg ; 파일 https://upload.wikimedia.org/wikipedia/commons/4/4e/Samsung_Electronics_logo_%28english%29.svg
- 로고는 컬러/비율을 보존하고 흰 바탕에 배치한다. 고객사나 제휴사 목록이 아닌 사례 식별 요소다.

내장 image_gen으로 생성: public/images/landing/lucky-cat.png, night-room.png, work-corner.png. 모든 이미지는 서비스 디자인을 위한 연출이며 실제 판매 상품 사진이 아니다.

생성 프롬프트 요약:
- lucky-cat: cream linen protective good-luck cat ornament, terracotta braided cord and brass bell on pale oak cabinet, butter yellow scalloped tray, pale blue vase, contemporary Korean studio, realistic embroidery, no text.
- night-room: compact 18 square meter Korean studio at blue hour, butter yellow mushroom lamp, linen bed, burnt orange pillow, pale blue cup, ordinary Seoul low-rise view, cozy and attainable, no text or traditional ink art.
- work-corner: tiny oak desk in Korean rental studio, chrome chair, sage lamp, notebook, closed silver laptop with no logo, blue glass vase, morning light, attainable Nordic modern details, no text.

## 검증

getStoryIndex 순방향/역방향/범위 밖/높이 0 단위 테스트 추가. 기존 상담 재시작 테스트 유지. 브라우저 도구의 관리자 정책 확인 오류가 계속되어 실제 스크롤·뷰포트 검증은 미완료. 우회 접근하지 않았다.
