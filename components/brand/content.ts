export const topics = [
  { id: 'lonely', label: '혼자인 밤', english: 'A little less alone.', title: '밖에서는 괜찮았는데,\n집에 오니 마음이 허전해.', note: '혼자 있는 시간도, 나를 좋아하는 시간이 되도록.', cta: '내 마음이 허전한 이유 알아보기', color: '#b6c5ac', ink: '#242923' },
  { id: 'love', label: '연애', english: 'Room for love.', title: '좋아하는 사람은 있는데,\n왜 우리 사이는 제자리일까?', note: '설렘과 답답함 사이, 내 마음부터 읽어봐요.', cta: '내 연애 이야기 시작하기', color: '#e6a28e', ink: '#392422' },
  { id: 'career', label: '일과 시작', english: 'Your own direction.', title: '열심히 달리고 있는데,\n내가 원하는 방향이 맞을까?', note: '남들의 속도보다, 나에게 어울리는 방향으로.', cta: '나에게 맞는 방향 알아보기', color: '#b8cbd1', ink: '#263c43' },
  { id: 'money', label: '돈 걱정', english: 'A softer landing.', title: '차곡차곡 살고 싶은데,\n마음의 여유는 언제 생길까?', note: '더 단단해지고 싶은 마음에도, 나만의 이야기가 있어요.', cta: '내 재물운 이야기 시작하기', color: '#d6bd84', ink: '#332c1d' },
  { id: 'rest', label: '쉼과 불안', english: 'Permission to pause.', title: '분명 쉬고 있는데,\n왜 마음은 쉬어지지 않을까?', note: '애쓴 마음이 편히 머무를 수 있는 자리를 찾아요.', cta: '지친 내 마음 들여다보기', color: '#d5d1e0', ink: '#322b3c' },
  { id: 'taste', label: '취향과 로망', english: 'Good taste. Your taste.', title: '자꾸 저장하게 되는 그 방,\n나에게도 잘 어울릴까?', note: '좋아하는 장면에는, 나를 발견할 단서가 있어요.', cta: '내 취향과 사주 연결해보기', color: '#e9e4d7', ink: '#32352b' },
] as const;
export type TopicId = typeof topics[number]['id'];
export function getTopic(value?: string) { return topics.find(t => t.id === value); }
export const objects = [
  { id: 'cat', title: 'Little guardian', korean: '작은 고양이, 다정한 마음의 부적', category: 'Objects', material: 'Ceramic · Cotton · Brass', src: '/images/landing/objects/cat.webp', shape: 'arch' },
  { id: 'lamp', title: 'An evening glow', korean: '하루의 끝을 부드럽게 밝히는 빛', category: 'Lighting', material: 'Opal glass · Burgundy enamel', src: '/images/landing/objects/lamp.webp', shape: 'corner' },
  { id: 'vase', title: 'One little bloom', korean: '한 송이로도 달라지는 작은 풍경', category: 'Objects', material: 'Handblown glass · Olive', src: '/images/landing/objects/vase.webp', shape: 'oval' },
  { id: 'cushion', title: 'Stay a little longer', korean: '자꾸만 기대고 싶은 보드라운 곡선', category: 'Textiles', material: 'Bouclé · Scalloped piping', src: '/images/landing/objects/cushion.webp', shape: 'square' },
] as const;
