import { HTMLAttributes } from "react";

export function Card({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-ink/10 bg-cream shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
