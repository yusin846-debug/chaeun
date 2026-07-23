"use client";

import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { OhaengInfo, SizeId, SpaceInfo, StructureInfo } from "@/lib/content";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { PrimaryButton } from "./PrimaryButton";

interface FengshuiPanelProps {
  open: boolean;
  space: SpaceInfo;
  structure: StructureInfo;
  ohaeng: OhaengInfo;
  onClose: () => void;
  onApplySize: (size: SizeId) => void;
}

function PanelBody({
  space,
  structure,
  ohaeng,
  onClose,
  onApplySize,
}: Omit<FengshuiPanelProps, "open">) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 text-ink/40 hover:text-ink"
        aria-label="닫기"
      >
        ✕
      </button>

      <svg viewBox="0 0 200 130" className="mx-auto mb-5 w-full max-w-[220px]">
        <rect
          x="18"
          y="16"
          width="164"
          height="98"
          rx="6"
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <line
          x1="18"
          y1="114"
          x2="182"
          y2="114"
          stroke={ohaeng.color}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <rect
          x="84"
          y="90"
          width="32"
          height="22"
          rx="2"
          fill="var(--color-cream)"
          stroke={ohaeng.color}
          strokeWidth="2"
        />
        <path
          d="M89 106l6-8 5 5 5-5 8 8"
          fill="none"
          stroke={ohaeng.color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p className="mb-1 font-heading text-lg font-semibold text-ink">
        {space.label}엔, 이 벽이 좋아요
      </p>
      <p className="mb-4 text-sm leading-relaxed text-ink/70">
        {space.intro} 당신에게 필요한{" "}
        <span style={{ color: ohaeng.color }} className="font-semibold">
          {ohaeng.label}({ohaeng.hanja})
        </span>
        의 기운, {ohaeng.mood}을 이 공간에 채워보세요. {ohaeng.wallHint}에 걸어두면
        좋아요.
      </p>

      <div className="mb-5 flex items-center gap-2 rounded-xl bg-ink/5 px-3 py-2">
        <span className="text-xs text-ink/50">{structure.label} 기준 추천 사이즈</span>
        <span
          className="ml-auto rounded-full px-2.5 py-1 text-xs font-semibold text-cream"
          style={{ backgroundColor: ohaeng.color }}
        >
          {structure.recommendedSize}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-full border border-ink/15 px-4 py-2.5 text-sm text-ink/60"
        >
          나중에 볼게요
        </button>
        <PrimaryButton
          className="flex-1"
          onClick={() => onApplySize(structure.recommendedSizeId)}
        >
          이 사이즈로 담기
        </PrimaryButton>
      </div>
    </>
  );
}

export function FengshuiPanel({
  open,
  space,
  structure,
  ohaeng,
  onClose,
  onApplySize,
}: FengshuiPanelProps) {
  const isDesktop = useIsDesktop();

  if (typeof document === "undefined") return null;

  const body = (
    <PanelBody
      space={space}
      structure={structure}
      ohaeng={ohaeng}
      onClose={onClose}
      onApplySize={onApplySize}
    />
  );

  const content = isDesktop ? (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: 32, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 32, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="fixed right-0 top-0 z-50 h-full w-[340px] overflow-y-auto border-l border-ink/10 bg-cream p-6 shadow-xl"
        >
          {body}
        </motion.div>
      )}
    </AnimatePresence>
  ) : (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl bg-cream p-6 shadow-xl"
          >
            {body}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
