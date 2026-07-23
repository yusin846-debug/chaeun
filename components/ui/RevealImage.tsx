"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ResultTier } from "@/lib/content";

interface RevealImageProps {
  accent: string;
  revealed: boolean;
  onReveal: () => void;
  tier?: ResultTier | null;
}

export function RevealImage({ accent, revealed, onReveal, tier = null }: RevealImageProps) {
  const isPhysical = revealed && tier === "physical";
  const watermarkOpacity = !revealed ? 0.28 : tier === "digital" ? 0 : tier === "physical" ? 0 : 0.22;

  return (
    <div
      className="w-full max-w-xs transition-[padding] duration-500"
      style={
        isPhysical
          ? {
              padding: 14,
              borderRadius: 20,
              background:
                "linear-gradient(160deg, var(--color-oheng-wood) 0%, #7a5a3a 100%)",
              boxShadow: "0 18px 40px -12px rgba(44,44,42,0.35)",
            }
          : undefined
      }
    >
      <button
        type="button"
        onClick={onReveal}
        disabled={revealed}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-ink/10 shadow-lg"
      >
        <motion.div
          animate={{
            filter:
              revealed && tier === "free"
                ? "blur(0px) saturate(0.85)"
                : revealed
                  ? "blur(0px)"
                  : "blur(22px)",
            scale: revealed ? 1 : 1.12,
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-paper"
        >
          <Image
            src="/images/chaeun-hero-landscape.png"
            alt=""
            fill
            sizes="(max-width: 640px) 80vw, 320px"
            className="object-cover object-[74%_center]"
          />
          <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor: accent, opacity: 0.1 }} />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden transition-opacity duration-500"
          style={{ opacity: watermarkOpacity }}
        >
          <div className="rotate-[-28deg] whitespace-nowrap text-2xl font-semibold tracking-[0.3em] text-ink/70">
            채운 · 미리보기 · 채운 · 미리보기 · 채운
          </div>
        </div>

        {revealed && tier === "digital" && (
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-cream"
          >
            HD
          </motion.span>
        )}

        {!revealed && (
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="absolute inset-x-0 bottom-5 flex justify-center"
          >
            <span className="rounded-full bg-ink/70 px-4 py-1.5 text-xs font-medium text-cream">
              탭하여 확인하기
            </span>
          </motion.div>
        )}
      </button>
    </div>
  );
}
