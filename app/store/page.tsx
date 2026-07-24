"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type ElementFilter = "wood" | "fire" | "earth" | "metal" | "water" | "space" | "object" | "scent" | "appliance" | "sunflower";

interface StoreProduct {
  title: string;
  caption: string;
  price: string;
  tag: string;
  tagColor: string;
  element: ElementFilter;
  image: string;
  focus?: string;
  zoom?: number;
  reviews: number;
  recency: number;
  best: boolean;
}

const PRODUCTS: StoreProduct[] = [
  { title: "숲 사이로 보는 호수", caption: "일러스트 풍경 · 수(水)", price: "₩76,000", tag: "오행 · 수", tagColor: "var(--color-oheng-water)", element: "water", image: "/images/poster-forest-lake.png", reviews: 34, recency: 1, best: false },
  { title: "바우하우스 선셋", caption: "그래픽 포스터 · 화(火)", price: "₩42,000", tag: "오행 · 화", tagColor: "var(--color-oheng-fire)", element: "fire", image: "/images/poster-bauhaus.png", focus: "center 42%", zoom: 1.34, reviews: 61, recency: 4, best: false },
  { title: "고요한 서재", caption: "공간 시리즈 · 스터디", price: "₩84,000", tag: "공간", tagColor: "var(--color-pine)", element: "space", image: "/images/space-artwork-new.png", reviews: 45, recency: 5, best: false },
  { title: "들꽃 언덕의 구름", caption: "유화 풍경 · 목(木)", price: "₩76,000", tag: "오행 · 목", tagColor: "var(--color-oheng-wood)", element: "wood", image: "/images/poster-cloud-field.png", reviews: 39, recency: 2, best: false },
  { title: "곁에 두는 오브제", caption: "오브제 컬렉션", price: "₩38,000", tag: "오브제", tagColor: "var(--color-pine)", element: "object", image: "/images/poster-zuhause.png", reviews: 22, recency: 7, best: false },
  { title: "물의 흐름", caption: "수(水) · 청록의 파동", price: "₩68,000", tag: "오행 · 수", tagColor: "var(--color-oheng-water)", element: "water", image: "/images/name-flow-bg.png", reviews: 76, recency: 9, best: true },
  { title: "오클라호마 스쿼시", caption: "그래픽 포스터 · 목(木)", price: "₩42,000", tag: "오행 · 목", tagColor: "var(--color-oheng-wood)", element: "wood", image: "/images/poster-oklahoma.png", reviews: 18, recency: 10, best: false },
  { title: "나의 풍경 세트", caption: "개인화 컬렉션 · 4종", price: "₩120,000", tag: "베스트", tagColor: "var(--color-terracotta)", element: "space", image: "/images/my-landscape-set.png", reviews: 103, recency: 11, best: true },
  { title: "소나무 숲", caption: "목(木) · 짙은 초록의 결", price: "₩68,000", tag: "오행 · 목", tagColor: "var(--color-oheng-wood)", element: "wood", image: "/images/name-nature-bg.png", reviews: 57, recency: 12, best: true },
  { title: "노을의 종이", caption: "화(火) · 번지는 온기", price: "₩72,000", tag: "오행 · 화", tagColor: "var(--color-oheng-fire)", element: "fire", image: "/images/name-personal-bg.png", reviews: 30, recency: 13, best: false },
  { title: "고요한 침실", caption: "금(金) · 정갈한 여백", price: "₩84,000", tag: "오행 · 금", tagColor: "var(--color-oheng-metal)", element: "metal", image: "/images/space-bedroom.png", reviews: 41, recency: 6, best: false },
  { title: "마음을 담은 선물", caption: "토(土) · 안정과 신뢰", price: "₩58,000", tag: "오행 · 토", tagColor: "var(--color-oheng-earth)", element: "earth", image: "/images/home-collection.png", reviews: 88, recency: 3, best: true },
  { title: "청자 오브제", caption: "오브제 · 은은한 빛", price: "₩46,000", tag: "오브제", tagColor: "var(--color-pine)", element: "object", image: "/images/ceramic-jar.png", reviews: 52, recency: 1, best: false },
  { title: "유리 화병", caption: "오브제 · 흐린 유리에 담긴 잎", price: "₩44,000", tag: "오브제", tagColor: "var(--color-pine)", element: "object", image: "/images/glass-vase-flowers.png", reviews: 33, recency: 14, best: false },
  { title: "메탈릭 오브제 세트", caption: "금(金) · 정련된 형태", price: "₩58,000", tag: "오행 · 금", tagColor: "var(--color-oheng-metal)", element: "metal", image: "/images/metallic-shapes.png", reviews: 21, recency: 15, best: false },
  { title: "토마토 스탬프", caption: "그래픽 포스터 · 화(火)", price: "₩38,000", tag: "오행 · 화", tagColor: "var(--color-oheng-fire)", element: "fire", image: "/images/tomato-stamp.png", reviews: 16, recency: 16, best: false },
  { title: "리드 디퓨저", caption: "향기 · 은은하게 채우는 향", price: "₩32,000", tag: "향기", tagColor: "var(--color-terracotta)", element: "scent", image: "/images/incense-dish.png", reviews: 19, recency: 2, best: false },
  { title: "펜던트 조명", caption: "가전 · 은은한 빛의 결", price: "₩96,000", tag: "가전", tagColor: "var(--color-pine)", element: "appliance", image: "/images/pendant-lamp-green.png", reviews: 27, recency: 8, best: false },
  { title: "버섯 테이블 조명", caption: "가전 · 부드러운 실루엣", price: "₩112,000", tag: "가전", tagColor: "var(--color-pine)", element: "appliance", image: "/images/mushroom-lamps.png", reviews: 24, recency: 17, best: false },
  { title: "해바라기 한 송이", caption: "그래픽 포스터 · 해바라기", price: "₩38,000", tag: "해바라기", tagColor: "#8a5a2b", element: "sunflower", image: "/images/sunflower-matisse.png", reviews: 29, recency: 18, best: false },
  { title: "해바라기 밭", caption: "일러스트 · 해바라기", price: "₩44,000", tag: "판매량 1위", tagColor: "var(--color-terracotta)", element: "sunflower", image: "/images/sunflower-field.png", reviews: 121, recency: 19, best: true },
  { title: "플랫 해바라기", caption: "그래픽 포스터 · 해바라기", price: "₩36,000", tag: "해바라기", tagColor: "#8a5a2b", element: "sunflower", image: "/images/sunflower-flat.png", reviews: 22, recency: 20, best: false },
  { title: "블루 데이지", caption: "그래픽 포스터 · 해바라기", price: "₩36,000", tag: "해바라기", tagColor: "#8a5a2b", element: "sunflower", image: "/images/sunflower-daisy-blue.png", reviews: 18, recency: 21, best: false },
  { title: "유화 해바라기", caption: "유화 · 해바라기", price: "₩58,000", tag: "해바라기", tagColor: "#8a5a2b", element: "sunflower", image: "/images/sunflower-oil-sky.png", reviews: 27, recency: 22, best: false },
  { title: "해바라기 소녀", caption: "사진 · 해바라기", price: "₩64,000", tag: "해바라기", tagColor: "#8a5a2b", element: "sunflower", image: "/images/sunflower-field-girl.png", reviews: 35, recency: 23, best: false },
];

const FILTERS: { id: "all" | ElementFilter; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "wood", label: "목(木)" },
  { id: "fire", label: "화(火)" },
  { id: "water", label: "수(水)" },
  { id: "metal", label: "금(金)" },
  { id: "earth", label: "토(土)" },
  { id: "space", label: "공간" },
  { id: "object", label: "오브제" },
  { id: "scent", label: "향기" },
  { id: "appliance", label: "가전" },
  { id: "sunflower", label: "🌻 해바라기" },
];

const SORTS: { id: "all" | "best" | "recent" | "reviews"; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "best", label: "베스트" },
  { id: "recent", label: "최근인기" },
  { id: "reviews", label: "리뷰많은순" },
];

export default function StorePage() {
  const [active, setActive] = useState<"all" | ElementFilter>("all");
  const [sort, setSort] = useState<"all" | "best" | "recent" | "reviews">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const visibleProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    let list = active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.element === active);
    list = list.filter((p) => !q || p.title.toLowerCase().includes(q) || p.caption.toLowerCase().includes(q));
    if (sort === "best") list = list.filter((p) => p.best);
    else if (sort === "recent") list = [...list].sort((a, b) => a.recency - b.recency);
    else if (sort === "reviews") list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [active, sort, searchTerm]);

  return (
    <div className="min-h-svh px-6 pb-24 pt-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-terracotta">STORE</p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="mt-4 font-heading text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl lg:text-4xl">공간을 채우는 풍경들</h1>
          <div className="relative w-full sm:w-[280px]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)" strokeOpacity={0.4} strokeWidth="2" strokeLinecap="round" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="작품명으로 검색"
              className="w-full rounded-full border border-mist bg-paper py-2.5 pl-10 pr-4 text-[13px] text-ink outline-none"
            />
          </div>
        </div>

        <div className="mt-9 flex gap-7 overflow-x-auto border-b border-mist">
          {SORTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSort(s.id)}
              className="relative whitespace-nowrap pb-3.5 text-sm font-semibold"
              style={{ color: sort === s.id ? "var(--color-pine)" : "rgb(37 37 37 / .55)" }}
            >
              {s.label}
              {sort === s.id && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-pine" />}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {FILTERS.map((f) => {
            const isActive = active === f.id;
            const isSunflower = f.id === "sunflower";
            return (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className="whitespace-nowrap rounded-full border-[1.5px] px-[18px] py-2.5 text-[13px] font-semibold transition-colors"
                style={
                  isSunflower
                    ? { background: "#E8952E", color: "#5C3A1E", borderColor: "#8a5a2b" }
                    : {
                        background: isActive ? "var(--color-pine)" : "var(--color-paper)",
                        color: isActive ? "var(--color-paper)" : "var(--color-pine)",
                        borderColor: isActive ? "var(--color-pine)" : "var(--color-mist)",
                      }
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-5 sm:grid-cols-3">
        {visibleProducts.map((p) => (
          <Link key={p.title} href="/create" className="block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-mist">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 45vw, 30vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                style={{ objectPosition: p.focus ?? "center", transform: p.zoom ? `scale(${p.zoom})` : undefined }}
              />
              <span
                className="absolute left-3.5 top-3.5 whitespace-nowrap rounded-full bg-paper/92 px-3 py-1 text-[11px] font-bold tracking-[0.06em]"
                style={{ color: p.tagColor }}
              >
                {p.tag}
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="font-heading text-[17px] font-semibold text-ink">{p.title}</h3>
              <span className="text-[13px] font-semibold text-ink/60">{p.price}</span>
            </div>
            <p className="mt-1 text-[13px] text-ink/60">{p.caption}</p>
          </Link>
        ))}
      </div>

      <div className="relative mt-24 flex min-h-[44svh] flex-col items-center justify-center gap-6 overflow-hidden text-center">
        <p className="relative max-w-xs font-heading text-xl font-semibold text-ink">나에게 맞는 풍경이 궁금하다면</p>
        <Link href="/create" className="relative inline-flex min-h-14 items-center justify-center whitespace-nowrap rounded-full bg-pine px-8 text-sm font-semibold text-paper shadow-md transition-transform hover:scale-[1.03]">내 풍경 만들기</Link>
      </div>
    </div>
  );
}
