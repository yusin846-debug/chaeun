"use client";

import { CSSProperties } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface FloatingHalftoneCardProps {
  gradient: string;
  style: CSSProperties;
  rotate?: number;
  speed?: number;
  dotted?: boolean;
  className?: string;
}

export function FloatingHalftoneCard({
  gradient,
  style,
  rotate = 0,
  speed = 40,
  dotted = false,
  className = "",
}: FloatingHalftoneCardProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, speed]);

  return (
    <motion.div
      style={{ ...style, y, rotate, backgroundImage: gradient }}
      className={`absolute h-20 w-16 rounded-xl border border-ink/10 shadow-md sm:h-24 sm:w-20 ${className}`}
    >
      {dotted && (
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(44,44,42,0.25) 1px, transparent 1.3px)",
            backgroundSize: "6px 6px",
          }}
        />
      )}
    </motion.div>
  );
}
