"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProductGuide } from "@/lib/content";

interface ProductGuideAccordionProps {
  guides: ProductGuide[];
}

export function ProductGuideAccordion({ guides }: ProductGuideAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-ink/10 border-t border-ink/10">
      {guides.map((guide, i) => {
        const open = openIndex === i;
        return (
          <div key={guide.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="text-sm font-medium text-ink">{guide.title}</span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-ink/40"
              >
                ⌄
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-sm leading-relaxed text-ink/60">{guide.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
