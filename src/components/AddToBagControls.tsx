"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { formatPKR, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import CaseBundlePicker from "./CaseBundlePicker";

export default function AddToBagControls({
  product,
  variant = "card",
  onAdded,
}: {
  product: Product;
  variant?: "card" | "lightbox";
  onAdded?: () => void;
}) {
  const [added, setAdded] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const { add } = useCart();
  const compact = variant === "card";

  function flash(key: string) {
    setAdded(key);
    window.setTimeout(() => setAdded(null), 1400);
  }

  if (product.options?.length) {
    return (
      <>
        <div className={compact ? "space-y-1.5" : "space-y-2"}>
          {product.options.map((opt) => {
            const isBundle = opt.id === "bundle";
            const justAdded = added === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  if (isBundle) {
                    setPickerOpen(true);
                    return;
                  }
                  add(product, { optionId: opt.id });
                  flash(opt.id);
                  onAdded?.();
                }}
                className={`inline-flex w-full items-center justify-center gap-1.5 rounded-full font-medium tracking-wide transition active:scale-[0.98] ${
                  compact
                    ? "bg-mauve px-2 py-2 text-[11px] text-cream hover:bg-mauve-dark sm:text-xs"
                    : "bg-mauve px-4 py-3 text-sm text-cream shadow-soft hover:bg-mauve-dark"
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
                    In your bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
                    <span className="truncate">
                      {opt.label} · {formatPKR(opt.price)}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
        <CaseBundlePicker
          product={product}
          open={pickerOpen}
          onClose={() => setPickerOpen(false)}
          onAdded={onAdded}
        />
      </>
    );
  }

  function onAdd() {
    add(product);
    flash("set");
    onAdded?.();
  }

  return (
    <button
      type="button"
      onClick={onAdd}
      className={`inline-flex w-full items-center justify-center gap-1.5 rounded-full font-medium tracking-wide transition active:scale-[0.98] ${
        compact
          ? "bg-mauve px-2 py-2 text-[11px] text-cream hover:bg-mauve-dark sm:text-xs"
          : "bg-mauve px-4 py-3.5 text-sm text-cream shadow-soft hover:bg-mauve-dark"
      }`}
    >
      {added ? (
        <>
          <Check className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
          In your bag
        </>
      ) : (
        <>
          <ShoppingBag className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
          Add to bag
        </>
      )}
    </button>
  );
}
