import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { ProductPurchasePanel } from "@/components/store/ProductPurchasePanel";
import { ProductTabs } from "@/components/store/ProductTabs";
import { ProductFeatureSection } from "@/components/store/ProductFeatureSection";
import { ProductInfoList } from "@/components/store/ProductInfoList";
import { ProductGuideAccordion } from "@/components/store/ProductGuideAccordion";
import { RelatedProducts } from "@/components/store/RelatedProducts";
import { PRODUCTS } from "@/lib/content";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  return {
    title: product ? `${product.name} — 채운` : "채운",
    description: product?.tagline,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="min-h-svh pb-24">
      <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
        <HalftoneBackground accent={product.accent} />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-1 py-6">
          <p className="text-xs font-medium tracking-[0.1em] text-celadon">
            {product.location}
          </p>
          <h1 className="font-heading text-2xl font-bold text-ink">{product.name}</h1>
          <p className="text-sm text-ink/50">{product.tagline}</p>
        </div>

        <ProductTabs />

        <div className="grid gap-12 py-10 sm:grid-cols-[1fr_300px]">
          <div className="flex flex-col gap-16">
            <section id="intro" className="flex scroll-mt-28 flex-col gap-4">
              {product.intro.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-ink/70">
                  {paragraph}
                </p>
              ))}
            </section>

            <section id="features" className="flex scroll-mt-28 flex-col gap-10">
              <h2 className="font-heading text-xl font-semibold text-ink">주요 특징</h2>
              {product.features.map((feature) => (
                <ProductFeatureSection key={feature.title} feature={feature} />
              ))}
            </section>

            <section id="info" className="flex scroll-mt-28 flex-col gap-10">
              <div className="flex flex-col gap-4">
                <h2 className="font-heading text-xl font-semibold text-ink">상품 정보</h2>
                <ProductInfoList items={product.info} />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-heading text-xl font-semibold text-ink">안내 사항</h2>
                <ProductGuideAccordion guides={product.guides} />
              </div>
            </section>
          </div>

          <aside className="sm:sticky sm:top-28 sm:self-start">
            <ProductPurchasePanel product={product} />
          </aside>
        </div>

        <RelatedProducts products={related} />
      </div>
    </div>
  );
}
