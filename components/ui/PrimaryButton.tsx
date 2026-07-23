"use client";

import { motion } from "motion/react";
import { ButtonHTMLAttributes } from "react";

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
>;

interface PrimaryButtonProps extends NativeButtonProps {
  variant?: "primary" | "secondary" | "ghost";
}

const VARIANT_CLASS: Record<NonNullable<PrimaryButtonProps["variant"]>, string> = {
  primary: "bg-celadon text-cream",
  secondary: "bg-terracotta text-cream",
  ghost: "bg-transparent text-ink border border-ink/20",
};

export function PrimaryButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
      className={`rounded-full px-6 py-3 text-sm font-medium shadow-sm transition-shadow hover:shadow-md disabled:opacity-40 ${VARIANT_CLASS[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
