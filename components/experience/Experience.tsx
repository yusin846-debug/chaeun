"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useExperienceStore } from "@/lib/store";
import { LandingStep } from "./steps/LandingStep";
import { InfoInputStep } from "./steps/InfoInputStep";
import { StoryRevealStep } from "./steps/StoryRevealStep";
import { ClimaxSelectionStep } from "./steps/ClimaxSelectionStep";
import { ProductOptionsStep } from "./steps/ProductOptionsStep";

export function Experience() {
  const step = useExperienceStore((s) => s.step);
  const goTo = useExperienceStore((s) => s.goTo);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {step === "landing" && <LandingStep onStart={() => goTo("info")} />}
        {step === "info" && <InfoInputStep onComplete={() => goTo("story")} />}
        {step === "story" && <StoryRevealStep onComplete={() => goTo("climax")} />}
        {step === "climax" && (
          <ClimaxSelectionStep onSelect={() => goTo("options")} />
        )}
        {step === "options" && <ProductOptionsStep />}
      </motion.div>
    </AnimatePresence>
  );
}
