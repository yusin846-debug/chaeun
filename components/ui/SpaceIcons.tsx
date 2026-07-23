import { SpaceId } from "@/lib/content";
import { SVGProps } from "react";

const commonProps: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const ICONS: Record<SpaceId, SVGProps<SVGSVGElement>["children"]> = {
  living: (
    <>
      <path d="M4 17v-4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
      <path d="M3 17h18M6 11V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" />
    </>
  ),
  bedroom: (
    <>
      <path d="M3 19v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 19h18M5 13V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v4M13 12h6" />
    </>
  ),
  entrance: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="1" />
      <circle cx="14" cy="12" r="1" fill="currentColor" />
    </>
  ),
  study: (
    <>
      <path d="M3 6.5 12 9l9-2.5" />
      <path d="M3 6.5v11L12 20l9-2.5v-11" />
      <path d="M12 9v11" />
    </>
  ),
};

export function SpaceIcon({ id, ...props }: { id: SpaceId } & SVGProps<SVGSVGElement>) {
  return (
    <svg {...commonProps} {...props}>
      {ICONS[id]}
    </svg>
  );
}
