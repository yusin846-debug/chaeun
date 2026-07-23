import Link from "next/link";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { Product } from "@/lib/content";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-heading text-xl font-semibold text-ink">함께 보면 좋은 상품</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/store/${product.slug}`}
            className="group overflow-hidden rounded-xl border border-ink/10 bg-cream transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <HalftoneBackground accent={product.accent} />
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-ink">{product.name}</p>
              <p className="mt-0.5 text-xs font-medium text-celadon">
                {product.price.toLocaleString("ko-KR")}원
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
