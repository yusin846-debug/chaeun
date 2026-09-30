# 슈슈의 주제 우선 상담 설계

2026-09-29 grill-with-docs 진행.

## 사용자 지시로 확정
- 기존의 일반 사주 첫 해석 → 주제 선택 순서를 변경한다. 먼저 주제를 정해야 상담을 시작한다.
- 여섯 주제와 직접 입력 유지. 고양이 이름은 슈슈, 서비스 이름은 채운.
- 작은 영문 라벨, 장식 설명, 상태 문구 제거. 필요한 행동 버튼과 대사에 집중.
- 꽃 이모지 대신 랜딩의 흰 꽃잎/노란 꽃술 SVG를 공유한다.

## 1차 질문
1. 확정: 누구나 주제를 확인하고 시작한다. 랜딩 주제 CTA는 미리 선택하되 확인을 생략하지 않는다. 슈슈의 첫 대사는 “안녕, 난 슈슈야. 오늘은 어떤 이야기를 해볼까?”로 한다.
2. 확정: 주제 선택 뒤 상황 질문 하나를 먼저 하고, 사용자의 답과 사주를 연결해 맞춤 해석한다.

## 후속 경계
- 주제 선택 화면은 생년정보 입력 후 슈슈와 만나는 첫 화면을 기본 제안으로 둔다.
- 직접 입력은 실제 고민 한 문장을 받아 주제로 삼아야 한다. 빈 일반 상담으로 우회하지 않는다.
- 기존 상담은 삭제하거나 갑자기 새 상담으로 초기화하지 않는다. 주제 미정인 저장 상담의 전환 방식을 정한다.
- 중간 정리는 선택 클릭 대신 실제 상황 답변을 기준으로 3~4회 왕복 후 제공한다.
- 사주 근거를 반복하는 일방 강의가 아니라 사용자 말 → 관련 사주 해석 → 한 가지 후속 질문으로 연결한다. 성향 정정은 수용하고, 사주를 핑계로 반박하지 않는다.
- 대운은 선택 주제에 관련될 때 계산된 범위 안에서 연결한다. 구체적 사건 발생을 보장하지 않는다.

사용자가 전체 흐름을 최종 승인하여 구현했다. 출생 입력 후 주제 확인은 로컬 화면에서 진행하고, 주제별 상황 질문을 첫 assistant 메시지로 저장한다. 실제 사용자 답변부터 API 해석을 요청하므로 주제 선택 클릭은 중간 정리 횟수에 포함되지 않는다. 직접 입력은 고민 문장을 받아 바로 해석 요청한다. 기존 메시지가 있는 상담은 그대로 이어가며 빈 주제는 다음 발화에서 자유 상담으로 연결한다. 서버도 미선택·무응답 요청을 거부한다. 17개 테스트 통과.


## 시작 화면 복구 확인
서버 업데이트 전부터 열려 있던 이전 클라이언트가 빈 대화로 해석을 요청해 새 서버의 주제 검증에 거부되었다. 페이지 재로딩으로 최신 주제 선택 UI가 표시되고 기존 출생정보는 유지되는 것을 실제 화면에서 확인했다. 시작 대사는 “안녕! 슈슈랑 어떤 주제로 이야기를 시작해볼까? 요즘 관심사가 궁금해.”로 통일했다.


## 주제 확장 및 심벌 버튼
2026-09-29 사용자 추가 요청: 이사·자취 시작·인테리어를 별도 주제로 추가했다. 각각 별도의 상황 질문과 API·저장 스키마를 연결했다. 방 배경 그림 생성 방향은 사용자 정정에 따라 사용하지 않는다. 사진형 카드 대신 버튼 크기에 맞춘 SVG 심벌과 부드러운 종이 질감을 사용한다. 혼자인 밤=남색 달·별, 연애=핑크 하트, 이사=상자·열쇠, 자취=집, 인테리어=조명·소파. 랜딩의 기존 여섯 스토리는 유지하고 상담 선택지는 별도로 관리한다.

## 사주 흐름 중심의 중간 점검
사용자 요청에 따라 일반적인 연애 상담을 길게 이어가기보다 실제로 말한 답답함을 공감하고 계산된 원국 관계와 관련 대운의 전통적 해석을 연결한다. 기운의 정체를 실증된 사건 원인처럼 단정하지 않고, 보완 가능한 방향과 강점을 통해 안심시킨다. 실제 사용자 답변 4회 후 summary를 반환하며, 슈슈의 마지막 정리 대사 출력이 끝나면 중간 점검을 화면에 직접 펼친다. 별도 노트 버튼을 찾아야만 볼 수 있는 구조를 해제했다. 점검은 '지금 너의 마음 / 사주로 읽은 흐름 / 함께 채워볼 기운'과 분포 도표로 구성한다. 사용자가 정정할 수 있도록 확인 질문과 입력을 유지한다.

## 2026-09-29 · Entrance and conversational variety
- Birth submission opens a warm cream preparation screen with the shared rotating daisy for at least 1.2 seconds. Room/cat images preload; a 4-second asset timeout prevents an indefinite wait. Chart errors return to the birth form with an error; abort cancels the transition timer. The room fades in after preparation, respecting reduced motion.
- Question direction follows desired change → comfortable exception → recovery resource → checkpoint, counting actual user messages rather than dialogue pages. Previous six questions are supplied as repetition context alongside full history. Already answered information overrides the planned direction. Checkpoint feedback leads to concrete application instead of restarting intake.
- Shushu sprite v2 restores rounded cheeks and makes the orange blanket explicit. Four facial states and the original gouache texture remain.
- Validation: 22 tests, targeted lint and production build passed; current browser scene visually checked. New model instructions apply to the next generated answer; saved replies are unchanged. Semantic variety remains model-generated, not a deterministic guarantee.

## 2026-09-29 · Short interview → space dashboard (supersedes the four-answer flow)
- Stop the initial interview after two actual user answers. A completed checkpoint never starts another interview cycle.
- Immediately show: “이제 너의 기운을 다시 북돋게 해줄 방법에 대해서 고민해볼게.” and location intake. Existing sessions with a checkpoint also enter this flow without losing history.
- Two intake screens: neighborhood (optional, district/dong only), then room structure with optional multi-select view and daylight. No further conversational questions before the result.
- /api/consultation/space recalculates the chart, searches neighborhood context using only the neighborhood field, then produces a typed dashboard from the chart, concern, checkpoint and room conditions. Search failures fall back explicitly to user-provided room conditions. Source links appear with neighborhood recommendations; no fabricated scores or home orientations.
- Dashboard: symbolic supporting elements, conditional desk placement, neighborhood environment, window/light, color/material palette, three object suggestions and expandable original element counts. It is not a generated room photo or an actual floor plan.
- Space input and result persist with the existing browser session. Retry preserves inputs, edits invalidate the old result, requests cancel on unmount, reset removes the whole session.
- Web-search integration reference: https://developers.openai.com/api/docs/guides/tools-web-search


## 2026-09-30 — Five-answer checkpoint and space options
Supersedes the two-answer threshold: checkpoint follows five real user answers. Change question angles across wish, trigger, exception and resource. Require 1–2 named blockages grounded in the user's account and the calculated chart, never diseases, defects or curses. Existing sessions remain compatible.

A persistent My Saju HUD displays natal element counts. Space preview highlights supporting elements without changing those counts. The full bead chart lives in the detail modal. Dashboard order: room photo, visible suitability explanation, current blockage and space options, neighborhood match, objects. Remove the decorative flower and spherical score. Continue the landing's paper, ink, sage and modern typography.


## 2026-09-30 — Narrative dashboard revision
The dashboard replaces the large dialogue scene with a small fixed Shushu helper. Current-flow and item-navigation actions remain available. No dashboard disclosure or apply toggles: show NOW/NEXT expectations, personal room headline, suitability, supporting element beads, placement and view advice, items including art, materials and reasons, then neighborhood context and two sourced alternatives. Natal counts remain fixed. Before/after expresses an intended lived experience, not a changed natal chart or guaranteed outcome.

New space output requires journey (headline, before, after, bridge, traits) and sourced alternatives. Stored legacy results remain readable with topic-aware presentation and curated, source-linked woodland candidates where relevant. Shopping links lead to a characteristic-based product search; concept art is not represented as an exact purchasable SKU. Personalized poster generation remains a separate unimplemented step. Candidate-region environmental keywords must not enter the current-neighborhood score.
