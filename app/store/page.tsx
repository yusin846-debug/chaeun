import Link from "next/link";
import type { Metadata } from "next";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { PRODUCTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "스토어 — 채운",
  description: "액자, 디퓨저, 한지 인쇄 업그레이드 등 채운의 단품을 만나보세요.",
};

export default function StorePage() {
  return (
    <div className="min-h-svh px-6 pb-20 pt-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <span className="text-xs font-medium tracking-[0.2em] text-celadon">
            STORE
          </span>
          <h1 className="font-heading text-2xl font-bold text-ink">
            그림 없이도, 채운의 물건들
          </h1>
          <p className="max-w-sm text-sm text-ink/55">
            이미 그림을 소장하고 계신가요? 액자·디퓨저·한지 인쇄 같은 단품만 따로
            담을 수 있어요.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/store/${product.slug}`}
              className="group overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <HalftoneBackground accent={product.accent} />
              </div>
              <div className="p-4">
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
  );
}
