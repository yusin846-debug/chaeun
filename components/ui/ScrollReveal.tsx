"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const blurPx = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);

  return (
    <motion.div ref={ref} style={{ opacity, filter }} className={className}>
      {children}
    </motion.div>
  );
}
