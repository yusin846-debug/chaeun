"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface RollingPickerProps {
  label: string;
  values: number[];
  value: number;
  onChange: (value: number) => void;
  formatItem?: (value: number) => string;
}

const ITEM_HEIGHT = 44;
const PADDING_ITEMS = 2;

export function RollingPicker({
  label,
  values,
  value,
  onChange,
  formatItem,
}: RollingPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, values.indexOf(value)),
  );
  const rafRef = useRef<number | null>(null);
  const settleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const idx = Math.max(0, values.indexOf(value));
    el.scrollTop = idx * ITEM_HEIGHT;
    setActiveIndex(idx);
    // 최초 마운트 시 초기 값 위치로만 스크롤하면 됨
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const idx = Math.round(el.scrollTop / ITEM_HEIGHT);
      setActiveIndex(Math.min(values.length - 1, Math.max(0, idx)));
    });

    if (settleTimeout.current) clearTimeout(settleTimeout.current);
    settleTimeout.current = setTimeout(() => {
      const idx = Math.round(el.scrollTop / ITEM_HEIGHT);
      const clamped = Math.min(values.length - 1, Math.max(0, idx));
      onChange(values[clamped]);
    }, 120);
  }, [values, onChange]);

  const moveBy = (delta: number) => {
    const nextIndex = Math.min(values.length - 1, Math.max(0, activeIndex + delta));
    const nextValue = values[nextIndex];
    const el = containerRef.current;
    el?.scrollTo({ top: nextIndex * ITEM_HEIGHT, behavior: "smooth" });
    setActiveIndex(nextIndex);
    onChange(nextValue);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-medium text-ink/50">{label}</span>
      <div className="relative">
        <button
          type="button"
          onClick={() => moveBy(-1)}
          disabled={activeIndex === 0}
          aria-label={`${label} 이전 값`}
          className="absolute left-1/2 top-1 z-10 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-paper/95 text-xs text-pine shadow-sm transition-opacity disabled:opacity-25"
        >
          ▲
        </button>
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="no-scrollbar h-[220px] w-20 overflow-y-scroll"
          style={{ scrollSnapType: "y mandatory" }}
        >
          <div style={{ height: ITEM_HEIGHT * PADDING_ITEMS }} />
          {values.map((v, i) => {
            const distance = Math.abs(i - activeIndex);
            const opacity = distance === 0 ? 1 : distance === 1 ? 0.45 : 0.16;
            const scale = distance === 0 ? 1.15 : Math.max(0.85, 1 - distance * 0.08);
            return (
              <div
                key={v}
                style={{
                  height: ITEM_HEIGHT,
                  scrollSnapAlign: "center",
                  opacity,
                  transform: `scale(${scale})`,
                  transition: "opacity 150ms ease, transform 150ms ease",
                }}
                className="flex items-center justify-center text-lg font-semibold tabular-nums text-ink"
              >
                {formatItem ? formatItem(v) : v}
              </div>
            );
          })}
          <div style={{ height: ITEM_HEIGHT * PADDING_ITEMS }} />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-[88px] bg-gradient-to-b from-cream to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[88px] bg-gradient-to-t from-cream to-transparent" />
        <div
          className="pointer-events-none absolute inset-x-0 border-y border-celadon/40"
          style={{ top: ITEM_HEIGHT * PADDING_ITEMS, height: ITEM_HEIGHT }}
        />
        <button
          type="button"
          onClick={() => moveBy(1)}
          disabled={activeIndex === values.length - 1}
          aria-label={`${label} 다음 값`}
          className="absolute bottom-1 left-1/2 z-10 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-paper/95 text-xs text-pine shadow-sm transition-opacity disabled:opacity-25"
        >
          ▼
        </button>
      </div>
    </div>
  );
}
