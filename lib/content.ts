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

export const RESULT_TIERS: { id: ResultTier; label: string; sub: string }[] = [
  { id: "free", label: "저화질 무료 소장", sub: "SNS 공유용, 워터마크 포함" },
  { id: "digital", label: "고화질 디지털 소장", sub: "인화 가능한 원본 파일" },
  { id: "physical", label: "실물로 만들기", sub: "액자·캔버스·굿즈 제작" },
];

export interface ProductFeature {
  title: string;
  body: string;
  accents: string[];
}

export interface ProductInfoItem {
  label: string;
  value: string;
}

export interface ProductGuide {
  title: string;
  body: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  location: string;
  price: number;
  unit: string;
  tagline: string;
  description: string;
  intro: string[];
  accent: string;
  hasSizeOption?: boolean;
  features: ProductFeature[];
  info: ProductInfoItem[];
  guides: ProductGuide[];
}

export const PRODUCTS: Product[] = [
  {
    id: "hinoki-frame",
    slug: "hinoki-frame",
    name: "편백나무 단품 액자",
    location: "국내 소목장 협업 제작",
    price: 68000,
    unit: "개",
    tagline: "향과 결이 살아있는 원목 액자",
    description:
      "이미 소장한 그림을 새 액자에 옮겨 걸고 싶을 때를 위한 단품 액자예요. 편백나무 특유의 옅은 향과 결을 그대로 살렸어요.",
    intro: [
      "이미 소장한 그림을 새 액자에 옮겨 걸고 싶을 때를 위한 단품 액자예요. 채운의 실물 제작에 쓰는 것과 동일한 편백나무 원목을 얇게 가공해, 나뭇결과 옅은 향을 그대로 살렸어요.",
      "국내 소목장과 협업해 한 대씩 짜 맞추는 방식으로 제작해요. 화려한 장식 대신 결과 여백으로 완성도를 내는, 채운다운 액자예요.",
    ],
    accent: "var(--color-oheng-wood)",
    hasSizeOption: true,
    features: [
      {
        title: "결을 그대로 살린 원목",
        body: "편백나무 원목을 얇게 가공해 나뭇결과 옅은 향을 그대로 살렸어요. 시간이 지날수록 은은한 나무색으로 자연스럽게 깊어져요.",
        accents: ["var(--color-oheng-wood)", "var(--color-oheng-earth)", "var(--color-terracotta)"],
      },
      {
        title: "그림을 지키는 무반사 아크릴",
        body: "빛 반사가 적은 무반사 아크릴을 사용해 어느 각도에서 봐도 그림이 또렷하게 보여요. 유리보다 가볍고 깨질 걱정도 적어요.",
        accents: ["var(--color-celadon)", "var(--color-oheng-metal)", "var(--color-cream)"],
      },
    ],
    info: [
      { label: "소재", value: "편백나무(히노키) 원목" },
      { label: "마감", value: "무반사 아크릴" },
      { label: "제작 기간", value: "주문 후 5~7일" },
      { label: "배송", value: "국내 무료배송 (제주·도서산간 추가비용)" },
    ],
    guides: [
      {
        title: "배송 안내",
        body: "결제 완료 후 5~7일 내 제작을 시작해 순차 발송해요. 제주·도서산간 지역은 배송이 1~2일 더 걸릴 수 있어요.",
      },
      {
        title: "교환·환불 규정",
        body: "제작 시작 전에는 전액 환불이 가능해요. 제작에 들어간 이후에는 단순 변심 환불이 어려우니, 사이즈를 꼭 확인해주세요.",
      },
      {
        title: "제작 안내",
        body: "원목 특성상 결과 색상이 개체마다 조금씩 달라요. 이는 불량이 아니라 원목 액자 고유의 특징이에요.",
      },
    ],
  },
  {
    id: "diffuser",
    slug: "diffuser",
    name: "피톤치드 디퓨저",
    location: "편백숲 원료 사용",
    price: 32000,
    unit: "병",
    tagline: "편백 향을 은은하게, 공간 전체에",
    description:
      "액자 옆에 두면 은은한 편백 향이 오래 머무는 디퓨저예요. 그림의 기운과 향이 함께 공간을 채워요.",
    intro: [
      "액자 옆에 두면 은은한 편백 향이 오래 머무는 디퓨저예요. 눈으로 보는 풍경과 코로 스미는 향이 함께, 공간 전체의 기운을 채워요.",
      "국내 편백숲에서 얻은 원료로 만들어 향이 무겁지 않고, 은은하게 오래 지속돼요.",
    ],
    accent: "var(--color-oheng-earth)",
    features: [
      {
        title: "은은하게 오래가는 편백 향",
        body: "향이 강하게 퍼지기보다, 방 안에 옅게 스며들듯 오래 남도록 조향했어요. 두통을 유발하는 인공 향료는 넣지 않았어요.",
        accents: ["var(--color-oheng-earth)", "var(--color-oheng-wood)", "var(--color-terracotta)"],
      },
      {
        title: "그림 옆에 두기 좋은 크기",
        body: "협탁이나 액자 아래 선반에 자연스럽게 어울리는 크기와 색으로 만들었어요. 리드 스틱 8개가 함께 들어있어요.",
        accents: ["var(--color-cream)", "var(--color-oheng-earth)", "var(--color-ink)"],
      },
    ],
    info: [
      { label: "용량", value: "150ml" },
      { label: "지속 기간", value: "약 8~10주" },
      { label: "구성", value: "디퓨저 병 1 + 리드 스틱 8" },
      { label: "배송", value: "국내 무료배송 (제주·도서산간 추가비용)" },
    ],
    guides: [
      {
        title: "배송 안내",
        body: "결제 완료 후 2~3일 내 발송돼요. 유리 제품이라 파손 방지 포장으로 보내드려요.",
      },
      {
        title: "교환·환불 규정",
        body: "미개봉 상태에 한해 수령 후 7일 이내 교환·환불이 가능해요.",
      },
      {
        title: "이용 안내",
        body: "직사광선을 피해 서늘한 곳에 두면 향이 더 오래 유지돼요.",
      },
    ],
  },
  {
    id: "hanji-print",
    slug: "hanji-print",
    name: "한지 인쇄 업그레이드",
    location: "전통 한지 공방 협업",
    price: 15000,
    unit: "건",
    tagline: "전통 한지에 스며들 듯 인쇄",
    description:
      "일반 인화지 대신 한지에 인쇄해, 색이 번지듯 스며드는 질감을 더해요. 기존 주문에 추가하거나 단품으로도 구매할 수 있어요.",
    intro: [
      "일반 인화지 대신 한지에 인쇄해, 색이 번지듯 스며드는 질감을 더해요. 기존 주문에 추가 옵션으로 넣거나, 이미 받은 그림을 한지로 다시 뽑고 싶을 때 단품으로 구매할 수 있어요.",
      "전통 한지 공방과 협업해, 인쇄 후에도 한지 특유의 결과 두께감이 살아있도록 후처리해요.",
    ],
    accent: "var(--color-terracotta)",
    features: [
      {
        title: "손으로 뜬 전통 한지",
        body: "닥나무 섬유를 손으로 떠 만든 전통 한지를 사용해요. 기계로 뽑은 종이와는 다른, 불규칙하고 자연스러운 결이 남아요.",
        accents: ["var(--color-terracotta)", "var(--color-oheng-earth)", "var(--color-cream)"],
      },
      {
        title: "번지듯 스며드는 색",
        body: "한지는 잉크를 머금는 방식이 일반 인화지와 달라, 같은 이미지도 훨씬 부드럽고 따뜻한 톤으로 인쇄돼요.",
        accents: ["var(--color-oheng-fire)", "var(--color-terracotta)", "var(--color-oheng-earth)"],
      },
    ],
    info: [
      { label: "소재", value: "전통 한지 (닥나무 섬유)" },
      { label: "적용 가능", value: "포스터·캔버스 주문에 추가 가능" },
      { label: "제작 기간", value: "주문 후 3~5일 추가" },
      { label: "배송", value: "본 주문과 함께 배송" },
    ],
    guides: [
      {
        title: "적용 안내",
        body: "기존 주문의 소재를 한지로 바꾸는 옵션이에요. 단품 구매 시 옵션 선택 단계에서 원본 이미지를 다시 보내드리는 방식으로 진행돼요.",
      },
      {
        title: "교환·환불 규정",
        body: "인쇄 시작 전에는 전액 환불이 가능해요. 인쇄가 시작된 이후에는 환불이 어려워요.",
      },
      {
        title: "제작 안내",
        body: "한지 특유의 결 때문에 색상이 화면보다 차분하게 보일 수 있어요. 이는 한지 인쇄 고유의 질감이에요.",
      },
    ],
  },
  {
    id: "wallpaper-set",
    slug: "wallpaper-set",
    name: "오행 배경화면 세트",
    location: "디지털 다운로드 상품",
    price: 9000,
    unit: "세트",
    tagline: "다섯 기운을 담은 디지털 배경화면 5종",
    description:
      "목·화·토·금·수, 다섯 오행의 풍경을 각각 담은 배경화면 세트예요. 휴대폰과 데스크톱 사이즈를 모두 드려요.",
    intro: [
      "목·화·토·금·수, 다섯 오행의 풍경을 각각 담은 배경화면 세트예요. 오늘 필요한 기운에 따라 골라 쓸 수 있어요.",
      "결제 후 바로 다운로드할 수 있는 디지털 상품이라, 배송을 기다릴 필요 없이 바로 화면을 채울 수 있어요.",
    ],
    accent: "var(--color-celadon)",
    features: [
      {
        title: "다섯 기운을 담은 다섯 장",
        body: "목(木)의 대나무 숲부터 수(水)의 폭포까지, 오행 각각의 분위기를 담은 다섯 장의 풍경으로 구성했어요.",
        accents: ["var(--color-oheng-wood)", "var(--color-oheng-fire)", "var(--color-oheng-water)"],
      },
      {
        title: "휴대폰·데스크톱 사이즈 모두",
        body: "휴대폰 잠금화면 비율과 데스크톱 와이드 비율을 모두 포함해, 어떤 화면에 써도 딱 맞아요.",
        accents: ["var(--color-oheng-metal)", "var(--color-celadon)", "var(--color-cream)"],
      },
    ],
    info: [
      { label: "파일 형식", value: "JPG (고해상도)" },
      { label: "구성", value: "오행 5종 × 모바일/데스크톱 2사이즈" },
      { label: "전달 방식", value: "결제 후 즉시 다운로드 링크 발송" },
      { label: "이용 범위", value: "개인 소장·개인 기기 사용" },
    ],
    guides: [
      {
        title: "다운로드 안내",
        body: "결제 완료 즉시 이메일로 다운로드 링크를 보내드려요. 링크는 7일간 유효해요.",
      },
      {
        title: "교환·환불 규정",
        body: "디지털 상품 특성상 다운로드 이후에는 환불이 어려워요. 다운로드 전이라면 전액 환불돼요.",
      },
      {
        title: "이용 안내",
        body: "개인 소장 및 개인 기기 배경화면 용도로만 사용해주세요. 재판매·재배포는 제한돼요.",
      },
    ],
  },
];
