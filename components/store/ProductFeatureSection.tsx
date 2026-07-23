import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { ProductFeature } from "@/lib/content";

interface ProductFeatureSectionProps {
  feature: ProductFeature;
}

export function ProductFeatureSection({ feature }: ProductFeatureSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-heading text-lg font-semibold text-ink">{feature.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/60">{feature.body}</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {feature.accents.map((accent, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-xl border border-ink/10"
          >
            <HalftoneBackground accent={accent} />
          </div>
        ))}
      </div>
    </div>
  );
}
