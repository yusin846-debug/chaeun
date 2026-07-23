import { HTMLAttributes } from "react";

export function Card({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`paper-surface gallery-shadow rounded-3xl border border-mist/80 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
