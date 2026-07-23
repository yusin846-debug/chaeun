import type { ReactNode, SVGProps } from "react";

export type NatureIconName = "mountain" | "waterfall" | "sun" | "pine" | "cloud" | "wind" | "stone" | "balance";

const common: SVGProps<SVGSVGElement> = { viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };

export function NatureIcon({ name, ...props }: { name: NatureIconName } & SVGProps<SVGSVGElement>) {
  const shapes: Record<NatureIconName, ReactNode> = {
    mountain: <><path d="M3 25 12 9l6 10 3-5 8 11H3Z" /><path d="m9.5 13 2.5 2 2-2" /></>,
    waterfall: <><path d="M4 25h24" /><path d="M7 6v19M13 6v19M19 6v19M25 6v19" /><path d="M7 6c3-4 5-4 8 0 3-4 6-4 10 0" /></>,
    sun: <><circle cx="16" cy="16" r="8" /><path d="M16 3v3M16 26v3M3 16h3M26 16h3M6.8 6.8l2.1 2.1M23.1 23.1l2.1 2.1M25.2 6.8l-2.1 2.1M8.9 23.1l-2.1 2.1" /></>,
    pine: <><path d="M16 27V6M16 7l-7 6h5l-8 7h7l-7 6h20l-7-6h7l-8-7h5l-7-6Z" /></>,
    cloud: <><path d="M7 24h17a5 5 0 0 0 .7-9.9A8.5 8.5 0 0 0 8.5 16 4.2 4.2 0 0 0 7 24Z" /></>,
    wind: <><path d="M4 11h16c4 0 4-5 0-5-2 0-3 1-3 3" /><path d="M4 17h22c4 0 4 5 0 5-2 0-3-1-3-3" /><path d="M4 23h9" /></>,
    stone: <><path d="M4 24c3-9 9-13 14-7 2-4 8-2 10 7H4Z" /><path d="M9 22c1-4 4-6 7-5" /></>,
    balance: <><circle cx="16" cy="16" r="11" /><path d="M16 5a11 11 0 0 1 0 22" /></>,
  };
  return <svg {...common} {...props}>{shapes[name]}</svg>;
}
