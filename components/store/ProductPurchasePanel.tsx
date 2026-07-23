"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { OptionSelector } from "@/components/ui/OptionSelector";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Card } from "@/components/ui/Card";
import { Product, SIZE_OPTIONS, SizeId } from "@/lib/content";

interface ProductPurchasePanelProps {
  product: Product;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [size, setSize] = useState<SizeId>("a3");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const total = product.price * quantity;

  return (
    <Card className="flex w-full flex-col gap-5 p-5">
      <div>
        <p className="text-lg font-semibold text-ink">
          {product.price.toLocaleString("ko-KR")}원{" "}
          <span className="text-sm font-normal text-ink/40">/ {product.unit}</span>
        </p>
      </div>

      {product.hasSizeOption && (
        <OptionSelector
          label="사이즈"
          options={SIZE_OPTIONS}
          selected={size}
          onToggle={(id) => setSize(id as SizeId)}
        />
      )}

      <div className="flex flex-col gap-3">
        <span className="text-xs font-medium text-ink/50">수량</span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/60"
            aria-label="수량 줄이기"
          >
            −
          </button>
          <span className="w-6 text-center text-sm font-semibold text-ink">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/60"
            aria-label="수량 늘리기"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-ink/5 px-3 py-2.5">
        <span className="text-xs text-ink/50">총액</span>
        <span className="text-base font-semibold text-ink">
          {total.toLocaleString("ko-KR")}원
        </span>
      </div>

      {!added ? (
        <PrimaryButton onClick={() => setAdded(true)}>장바구니 담기</PrimaryButton>
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="px-4 py-3 text-center text-sm text-celadon">
            장바구니에 담았어요. ({quantity}개)
          </Card>
        </motion.div>
      )}
    </Card>
  );
}
