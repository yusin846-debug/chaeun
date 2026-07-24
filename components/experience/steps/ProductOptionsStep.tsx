"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { OptionSelector } from "@/components/ui/OptionSelector";
import { SpaceSelector } from "@/components/ui/SpaceSelector";
import { FengshuiPanel } from "@/components/ui/FengshuiPanel";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Card } from "@/components/ui/Card";
import { BackButton } from "@/components/ui/BackButton";
import {
  ADDON_OPTIONS,
  AddonId,
  MATERIAL_OPTIONS,
  MaterialId,
  OHAENG,
  SIZE_OPTIONS,
  SizeId,
  SPACES,
  STRUCTURES,
} from "@/lib/content";
import { useExperienceStore } from "@/lib/store";

export function ProductOptionsStep() {
  const [orderRequested, setOrderRequested] = useState(false);

  const product = useExperienceStore((s) => s.product);
  const setSize = useExperienceStore((s) => s.setSize);
  const setMaterial = useExperienceStore((s) => s.setMaterial);
  const toggleAddon = useExperienceStore((s) => s.toggleAddon);
  const setSpace = useExperienceStore((s) => s.setSpace);
  const setStructure = useExperienceStore((s) => s.setStructure);
  const closePopup = useExperienceStore((s) => s.closePopup);
  const applyRecommendedSize = useExperienceStore((s) => s.applyRecommendedSize);
  const missingOhaeng = useExperienceStore((s) => s.missingOhaeng);
  const goTo = useExperienceStore((s) => s.goTo);
  const ohaeng = OHAENG[missingOhaeng()];

  const selectedSpace = SPACES.find((s) => s.id === product.space);
  const selectedStructure = STRUCTURES.find((s) => s.id === product.structure);

  return (
    <div className="relative flex min-h-svh flex-col items-center gap-8 px-6 py-16">
      <BackButton onClick={() => goTo("climax")} />
      <h2 className="font-heading text-xl font-semibold text-ink">
        마지막으로, 상품을 골라주세요
      </h2>

      <div className="flex w-full max-w-sm flex-col gap-6">
        <OptionSelector
          label="사이즈"
          options={SIZE_OPTIONS}
          selected={product.size}
          onToggle={(id) => setSize(id as SizeId)}
        />
        <OptionSelector
          label="소재"
          options={MATERIAL_OPTIONS}
          selected={product.material}
          onToggle={(id) => setMaterial(id as MaterialId)}
        />
        <OptionSelector
          label="부가 옵션"
          options={ADDON_OPTIONS}
          selected={product.addons}
          onToggle={(id) => toggleAddon(id as AddonId)}
          multiple
          columns={2}
        />

        <SpaceSelector
          space={product.space}
          structure={product.structure}
          onSelectSpace={setSpace}
          onSelectStructure={setStructure}
        />

        {!orderRequested ? (
          <PrimaryButton className="mt-2" onClick={() => setOrderRequested(true)}>
            카카오톡 채널로 주문하기
          </PrimaryButton>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="px-4 py-3 text-center text-sm text-celadon">
              주문 요청이 접수됐어요. 카카오톡으로 안내드릴게요.
            </Card>
          </motion.div>
        )}
      </div>

      {selectedSpace && selectedStructure && (
        <FengshuiPanel
          open={product.popupOpen}
          space={selectedSpace}
          structure={selectedStructure}
          ohaeng={ohaeng}
          onClose={closePopup}
          onApplySize={applyRecommendedSize}
        />
      )}
    </div>
  );
}
