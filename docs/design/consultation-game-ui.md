# 상담 게임 UI — 2026-09-29

사용자 제공 크림색 고양이 그림을 참조해, 평면 과슈·리소그래프 질감과 올리브색 눈, 오렌지·크림 팔레트를 유지했다. 내장 image_gen 도구 사용. 영상이 아니라 2×2 표정 스프라이트를 CSS 프레임 전환으로 재생한다.

## 저장한 에셋
- `public/images/consultation/cat-expressions-v1.png`: 투명 PNG, 듣기 / 말하기 / 눈웃음 / 생각하기 네 표정.
- `public/images/consultation/quiet-room-v1.png`: 같은 질감의 햇살 드는 작은 방 배경.

## 생성 프롬프트
고양이: Create ONE production-ready animation sprite atlas, square PNG with genuine transparent alpha background, 2 by 2 equal square cells, no borders no labels no text no shadows behind the character. Reference image is the EXACT character and art direction to preserve: elongated creamy white cat, huge almond mustard amber eyes with dark olive green pupils, angular oversized pointed ears, tiny burnt coral triangle nose, soft uneven hand-painted edges and subtle grainy gouache/riso paper texture. NOT 3D, NOT vector icon, NOT kawaii round chibi, NOT photoreal. Each cell contains the same entire cat reclining horizontally, head on left raised slightly facing viewer, long body trailing right, one forepaw stretched diagonally forward, tail curled gently; preserve recognizable elegant quirky face from reference. Character fully inside every cell, with 10 percent empty margin, exact same scale and registration in all 4 cells. Top left: attentive open eyes, closed tiny mouth. Top right: same pose, mouth slightly open as if speaking, eyes open. Bottom left: same pose, eyes closed in soft happy blink, closed mouth. Bottom right: same pose, head only slightly tilted, eyes looking up with thoughtful curiosity. Consistency is crucial for frame-switch animation. The cat should take 82 percent cell width and about 55 percent cell height, centered vertically. No orange background, just real transparency. High quality artist-made charming flat illustration with same unique visual identity as supplied cat.

배경: Use supplied image ONLY as art style and color palette reference. Generate one wide landscape 3:2 illustrated background plate for an elegant cozy visual novel game for women in their twenties and thirties. No cats, no characters, no text, no UI. Handmade flat gouache and riso grain on paper, warm muted apricot walls, burnt orange organic round rug very large across lower center, creamy sunlit arch window on upper left with calm sage foliage outside, a small low dark walnut side table far left holding a ceramic tea cup and a slender flower in amber glass, olive green indoor plant at far right, just a sliver of a curved cream armchair on far right. Large open uncluttered space in the center and lower center for a reclining cat character overlay, with the orange rug surface horizontal and fully visible. Contemporary Korean independent illustration brand mood, beautiful imperfect painted edges, no outlines, no 3D rendering, no photorealism, no ornate fantasy castles. Quiet afternoon, intimate rather than grand. Restrained cream, ochre, terracotta, dark olive palette matching the reference exactly. Thoughtfully art directed asymmetrical composition, inviting beautiful small room. Matte subtle natural paper texture throughout, soft drawn shapes, charming but not childish.

## 적용
- 기존 누적 말풍선을 한 대사씩 읽는 하단 프레임으로 변경. 한 번에 읽기 / 이전 / 다음 / 질문에서 직접 입력.
- 고민은 선택지, 만세력과 대운은 내 사주 창, 이전 대화는 기록 창, 중간 정리는 마음의 노트.
- 기존 API·저장된 대화는 유지. 서버에 새 대화를 추가하지 않고 기존 상담 화면으로 시각 검증.
- TypeScript·ESLint·production build 통과. HTTP 200, 브라우저 오류 로그 없음. 실제 화면에서 캐릭터·대사·4/4 질문 페이지 표시 확인.
