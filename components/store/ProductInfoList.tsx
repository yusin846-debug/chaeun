import { ProductInfoItem } from "@/lib/content";

interface ProductInfoListProps {
  items: ProductInfoItem[];
}

export function ProductInfoList({ items }: ProductInfoListProps) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-celadon" />
          <div>
            <p className="text-xs text-ink/40">{item.label}</p>
            <p className="text-sm font-medium text-ink">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
