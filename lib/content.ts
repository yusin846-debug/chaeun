export type OhaengId = "wood" | "fire" | "earth" | "metal" | "water";

export interface OhaengInfo {
  id: OhaengId;
  label: string;
  hanja: string;
  color: string;
  mood: string;
  wallHint: string;
  landscape: string;
  personality: string;
  synergyLine: string;
  transformation: string;
  flow: string;
}

export const OHAENG: Record<OhaengId, OhaengInfo> = {
  wood: {
    id: "wood",
    label: "목",
    hanja: "木",
    color: "var(--color-oheng-wood)",
    mood: "뻗어나가는 성장의 기운",
    wallHint: "동쪽 벽, 창가 바로 옆",
    landscape: "새순이 오르는 대나무 숲과 이른 봄의 계곡",
    personality:
      "새로운 것을 향해 거침없이 손을 뻗지만, 그 시작을 끝까지 밀어붙이는 뚝심은 자주 바닥났을 사람",
    synergyLine:
      "물이 고요히 뿌리를 적셔야 나무는 곧게 자랍니다 — 침실 쪽의 차분한 수(水)의 기운과 만나면, 뻗어나가는 힘에 방향과 안정감이 더해져요.",
    transformation:
      "정체돼 있던 계획들이 다시 움직이기 시작하고, 미뤄둔 일에 다시 손이 갈 거예요",
    flow: "현관에서 들어온 기운이 이 벽을 지나며 나무처럼 뻗어, 집 안 깊숙한 곳까지 생기를 밀어 넣어요",
  },
  fire: {
    id: "fire",
    label: "화",
    hanja: "火",
    color: "var(--color-oheng-fire)",
    mood: "일어서는 활력의 기운",
    wallHint: "남쪽 벽, 시선이 먼저 닿는 자리",
    landscape: "붉게 번지는 노을과 산등성이",
    personality:
      "마음이 동하면 누구보다 빠르게 타오르지만, 그 열기를 오래 지피는 일은 서툴렀을 사람",
    synergyLine:
      "나무가 있어야 불이 오래 탑니다 — 책이 있는 공간의 목(木)의 기운과 만나면, 활력이 금세 꺼지지 않고 은은하게 이어져요.",
    transformation:
      "가라앉아 있던 의욕이 다시 붙고, 하루를 시작하는 발걸음이 조금 더 가벼워질 거예요",
    flow: "이 벽에서 지펴진 온기가 거실 전체로 번지듯 퍼져, 집 안 곳곳에 활력을 실어 날라요",
  },
  earth: {
    id: "earth",
    label: "토",
    hanja: "土",
    color: "var(--color-oheng-earth)",
    mood: "중심을 잡아주는 안정의 기운",
    wallHint: "거실 중앙, 마주 보는 넓은 벽",
    landscape: "완만한 흙산과 너른 들녘",
    personality:
      "주변을 다독이고 중심을 잡아주면서도, 정작 자신을 다독이는 데는 서툴렀을 사람",
    synergyLine:
      "불이 타고 남아야 흙이 됩니다 — 볕이 잘 드는 공간의 화(火)의 기운과 만나면, 중심을 잡아주는 힘이 한층 더 단단해져요.",
    transformation: "이리저리 흔들리던 마음이 이 벽 앞에서만큼은 차분히 가라앉을 거예요",
    flow: "이 벽이 무게중심이 되어, 이리저리 흩어지던 기운이 이 자리를 중심으로 가지런히 모여요",
  },
  metal: {
    id: "metal",
    label: "금",
    hanja: "金",
    color: "var(--color-oheng-metal)",
    mood: "맺고 거두는 결실의 기운",
    wallHint: "서쪽 벽, 정돈된 자리",
    landscape: "가을 억새와 흰 바위 능선",
    personality:
      "맡은 일은 끝까지 정갈하게 마무리하지만, 스스로를 위한 매듭은 자주 미뤄뒀을 사람",
    synergyLine:
      "흙 속에서 금이 여뭅니다 — 넓고 안정된 공간의 토(土)의 기운과 만나면, 맺고 거두는 결실이 한층 또렷해져요.",
    transformation: "흐지부지 남겨뒀던 일들을 하나씩 깔끔하게 정리하고 싶어질 거예요",
    flow: "이 벽에서 정돈된 기운이 시작되어, 집안 곳곳의 흐트러진 매듭을 하나씩 여며줘요",
  },
  water: {
    id: "water",
    label: "수",
    hanja: "水",
    color: "var(--color-oheng-water)",
    mood: "차분히 흐르는 지혜의 기운",
    wallHint: "북쪽 벽, 침대나 소파 맞은편",
    landscape: "고요한 호수와 굽이치는 폭포",
    personality:
      "속으로는 누구보다 깊이 생각하면서도, 그 생각을 밖으로 흘려보내는 데는 오래 걸렸을 사람",
    synergyLine:
      "금이 맑아야 물이 흐려지지 않습니다 — 정돈된 공간의 금(金)의 기운과 만나면, 지혜의 흐름이 한결 더 투명해져요.",
    transformation: "쉽게 예민해지던 마음이 누그러지고, 생각이 조금 더 멀리, 깊이 흐를 거예요",
    flow: "이 벽에서 시작된 흐름이 낮은 곳을 따라 고요히 퍼져, 집 안 전체를 차분하게 적셔요",
  },
};

export const OHAENG_ORDER: OhaengId[] = [
  "wood",
  "fire",
  "earth",
  "metal",
  "water",
];

/** 오행 상생(相生) 순환: 목생화·화생토·토생금·금생수·수생목 */
export const OHAENG_CYCLE: OhaengId[] = [
  "wood",
  "fire",
  "earth",
  "metal",
  "water",
];

export function getGenerator(id: OhaengId): OhaengId {
  const idx = OHAENG_CYCLE.indexOf(id);
  const prevIdx = (idx - 1 + OHAENG_CYCLE.length) % OHAENG_CYCLE.length;
  return OHAENG_CYCLE[prevIdx];
}

export function getStoryLines(id: OhaengId): string[] {
  const o = OHAENG[id];
  return [
    "당신이 태어난 시간의 기운을 살펴보고 있어요...",
    "오행의 균형을 하나씩 짚어보는 중이에요.",
    `이 사주엔 ${o.label}(${o.hanja})의 기운이 유독 옅게 흐르고 있네요.`,
    `당신은 아마, ${o.personality}.`,
    o.synergyLine,
    `그래서 ${o.wallHint}에 이 기운을 놓아두면 좋아요.`,
    `그러면 ${o.transformation}.`,
    `그렇게 ${o.flow}.`,
  ];
}

export type TastePattern = "dots" | "grid" | "plain";

export interface TasteOption {
  id: string;
  label: string;
  sub: string;
  gradient: string;
  pattern?: TastePattern;
}

export interface TasteRound {
  id: string;
  prompt: string;
  options: TasteOption[];
}

export const TASTE_ROUNDS: TasteRound[] = [
  {
    id: "brush",
    prompt: "어떤 화풍이 더 끌리나요?",
    options: [
      {
        id: "dotted",
        label: "점묘화",
        sub: "무수한 점이 쌓여 만드는 결",
        gradient:
          "radial-gradient(circle at 30% 30%, var(--color-celadon) 0%, transparent 45%), radial-gradient(circle at 70% 70%, var(--color-oheng-wood) 0%, transparent 50%), var(--color-cream)",
        pattern: "dots",
      },
      {
        id: "ink",
        label: "수묵화",
        sub: "먹의 농담이 번지는 여백",
        gradient:
          "linear-gradient(160deg, var(--color-ink) 0%, transparent 60%), var(--color-cream)",
        pattern: "plain",
      },
      {
        id: "modern",
        label: "모던패턴",
        sub: "기하학적 선의 정갈한 리듬",
        gradient:
          "linear-gradient(135deg, var(--color-celadon) 0%, var(--color-oheng-metal) 100%)",
        pattern: "grid",
      },
      {
        id: "oil",
        label: "유화",
        sub: "두텁게 쌓아올린 붓의 질감",
        gradient:
          "radial-gradient(circle at 25% 20%, var(--color-oheng-fire) 0%, transparent 55%), radial-gradient(circle at 75% 60%, var(--color-terracotta) 0%, transparent 60%), var(--color-oheng-earth)",
        pattern: "plain",
      },
    ],
  },
  {
    id: "medium",
    prompt: "더 마음이 가는 표현은요?",
    options: [
      {
        id: "photo",
        label: "사진화",
        sub: "실제 풍경처럼 선명하게",
        gradient:
          "linear-gradient(135deg, var(--color-oheng-water) 0%, var(--color-celadon) 100%)",
      },
      {
        id: "watercolor",
        label: "수채화",
        sub: "물기를 머금은 부드러운 번짐",
        gradient:
          "linear-gradient(135deg, var(--color-oheng-earth) 0%, var(--color-terracotta) 100%)",
      },
    ],
  },
  {
    id: "tone",
    prompt: "공간에 어떤 온도를 더하고 싶나요?",
    options: [
      {
        id: "warm",
        label: "따뜻한 톤",
        sub: "해질녘처럼 은은하게",
        gradient:
          "linear-gradient(135deg, var(--color-oheng-fire) 0%, var(--color-oheng-earth) 100%)",
      },
      {
        id: "cool",
        label: "차분한 톤",
        sub: "새벽 공기처럼 맑게",
        gradient:
          "linear-gradient(135deg, var(--color-oheng-water) 0%, var(--color-oheng-metal) 100%)",
      },
    ],
  },
];

export type SpaceId = "living" | "bedroom" | "entrance" | "study";

export interface SpaceInfo {
  id: SpaceId;
  label: string;
  intro: string;
}

export const SPACES: SpaceInfo[] = [
  { id: "living", label: "거실", intro: "가족과 손님이 가장 오래 머무는 공간이에요." },
  { id: "bedroom", label: "침실", intro: "하루의 기운을 회복하는 공간이에요." },
  { id: "entrance", label: "현관", intro: "기운이 처음 드나드는 통로예요." },
  { id: "study", label: "서재", intro: "생각이 맑아야 하는 공간이에요." },
];

export type StructureId = "oneroom" | "tworoom" | "apartment";

export type SizeId = "a4" | "a3" | "large";
export type MaterialId = "poster" | "canvas" | "hinoki";
export type AddonId = "diffuser" | "hanji" | "pdf" | "guide";

export interface StructureInfo {
  id: StructureId;
  label: string;
  wallLength: string;
  recommendedSize: string;
  recommendedSizeId: SizeId;
}

export const STRUCTURES: StructureInfo[] = [
  {
    id: "oneroom",
    label: "원룸",
    wallLength: "짧은 벽",
    recommendedSize: "A4",
    recommendedSizeId: "a4",
  },
  {
    id: "tworoom",
    label: "투룸",
    wallLength: "보통 벽",
    recommendedSize: "A3",
    recommendedSizeId: "a3",
  },
  {
    id: "apartment",
    label: "아파트",
    wallLength: "넓은 벽",
    recommendedSize: "대형",
    recommendedSizeId: "large",
  },
];

export const SIZE_OPTIONS: { id: SizeId; label: string; sub: string }[] = [
  { id: "a4", label: "A4", sub: "책상 위, 작은 벽" },
  { id: "a3", label: "A3", sub: "가장 무난한 크기" },
  { id: "large", label: "대형", sub: "거실 중심 벽" },
];

export const MATERIAL_OPTIONS: { id: MaterialId; label: string; sub: string }[] = [
  { id: "poster", label: "기본 포스터", sub: "가볍게 시작하기" },
  { id: "canvas", label: "캔버스", sub: "은은한 질감" },
  { id: "hinoki", label: "편백나무 액자", sub: "향과 격을 더하기" },
];

export const ADDON_OPTIONS: { id: AddonId; label: string; sub: string }[] = [
  { id: "diffuser", label: "피톤치드 디퓨저", sub: "은은한 편백 향" },
  { id: "hanji", label: "한지 인쇄", sub: "전통 질감" },
  { id: "pdf", label: "상세 풀이 PDF", sub: "내 사주 해설" },
  { id: "guide", label: "방 배치 가이드", sub: "우리 집 배치 제안" },
];

export type ResultTier = "free" | "digital" | "physical";

export const RESULT_TIERS: { id: ResultTier; label: string; sub: string; price: string }[] = [
  { id: "free", label: "저화질 무료 소장", sub: "SNS 공유용, 워터마크 포함", price: "무료" },
  { id: "digital", label: "고화질 디지털 소장", sub: "인화 가능한 원본 파일 · 개인 소장 및 인화 가능", price: "12,900원" },
  { id: "physical", label: "실물로 만들기", sub: "액자·캔버스·굿즈 제작", price: "39,000원부터" },
];

