import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "스토어 — 채운",
  description: "액자, 디퓨저, 한지 인쇄 업그레이드 등 채운의 단품을 만나보세요.",
};

export default function StorePage() {
  const products = [...PRODUCTS].sort((a, b) => a.price - b.price);
  const productImage: Record<string, string> = {
    "wallpaper-set": "/images/chaeun-style-collection.png",
    "hanji-print": "/images/chaeun-hero-landscape.png",
    diffuser: "/images/chaeun-objects-collection.png",
    "hinoki-frame": "/images/chaeun-objects-collection.png",
    "oak-slim-frame": "/images/chaeun-objects-collection.png",
    "aluminum-frame": "/images/chaeun-objects-collection.png",
  };

  return (
    <div className="min-h-svh pb-24 pt-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <section className="relative overflow-hidden rounded-[2rem] bg-pine px-7 py-12 text-paper sm:px-12 sm:py-16">
          <Image src="/images/chaeun-showroom.png" alt="채운 작품이 놓인 거실 쇼룸" fill priority className="object-cover object-center opacity-70" />
          <div className="absolute inset-0 bg-pine/45" />
          <div className="relative max-w-md">
            <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-celadon">CHAEUN SHOWROOM</p>
            <h1 className="mt-5 font-heading text-3xl font-semibold leading-[1.35] tracking-[-0.03em] sm:text-4xl">공간에 오래 머무는,<br />채운의 물건들.</h1>
            <p className="mt-5 text-sm leading-7 text-paper/80">작품과 함께 놓일 액자, 한지, 향 그리고 오늘의 화면을 위한 풍경을 만나보세요.</p>
          </div>
        </section>

        <div className="mt-14">
          <div className="mb-6 flex items-end justify-between">
            <div><p className="text-[0.68rem] font-semibold tracking-[0.2em] text-pine">OBJECTS FOR YOUR SPACE</p><h2 className="mt-2 font-heading text-2xl font-semibold text-ink">가벼운 시작부터</h2></div>
            <p className="text-xs text-ink/50">낮은 가격순</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/store/${product.slug}`}
              className="group overflow-hidden rounded-3xl border border-mist bg-paper shadow-sm transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-paper">
                <Image src={productImage[product.id]} alt="" fill className={`object-cover transition-transform duration-500 group-hover:scale-105 ${product.id === "hanji-print" ? "object-[70%_center]" : product.id === "wallpaper-set" ? "object-[100%_100%]" : "object-center"}`} />
              </div>
              <div className="p-5">
                <p className="text-base font-semibold text-ink">{product.name}</p>
                <p className="mt-0.5 text-xs text-ink/50">{product.tagline}</p>
                <p className="mt-2 text-sm font-medium text-celadon">
                  {product.price.toLocaleString("ko-KR")}원
                </p>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
