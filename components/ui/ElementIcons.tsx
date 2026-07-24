import type { SVGProps } from "react";
import type { OhaengId } from "@/lib/content";

const common: SVGProps<SVGSVGElement> = { viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };

const PATHS: Record<OhaengId, string> = {
  wood: "M16 27V6 M16 7l-7 6h5l-8 7h7l-7 6h20l-7-6h7l-8-7h5l-7-6Z",
  fire: "M16 4c2 5-3 6-3 10a4 4 0 0 0 8 0c1 2 1 4 0 6a8 8 0 1 1-9-14 6 6 0 0 1 4-2Z",
  earth: "M4 24c3-9 9-13 14-7 2-4 8-2 10 7H4Z",
  metal: "M16 4l4 8 8 1-6 6 1 8-7-4-7 4 1-8-6-6 8-1Z",
  water: "M16 4c5 7 8 11 8 15a8 8 0 1 1-16 0c0-4 3-8 8-15Z",
};

export function ElementIcon({ id, ...props }: { id: OhaengId } & SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <path d={PATHS[id]} />
    </svg>
  );
}
