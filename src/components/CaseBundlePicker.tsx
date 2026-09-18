"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Image from "next/image";
import {
  formatPKR,
  pressOnProducts,
  productImages,
  type Product,
} from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function CaseBundlePicker({
  product,
  open,
  onClose,
  onAdded,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
  onAdded?: () => void;
}) {
  const { add } = useCart();
  const designs = useMemo(() => pressOnProducts(), []);
  const bundlePrice =
    product.options?.find((o) => o.id === "bundle")?.price ?? 2800;
  const [picked, setPicked] = useState<string[]>([]);

  function toggle(slug: string) {
    setPicked((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 2) return [prev[1], slug];
      return [...prev, slug];
    });
  }

  function confirm() {
    if (picked.length !== 2) return;
    add(product, { optionId: "bundle", bundleSlugs: picked });
    setPicked([]);
    onAdded?.();
    onClose();
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[140] flex items-end justify-center sm:items-center sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-charcoal/45 backdrop-blur-[3px]"
            onClick={() => {
              setPicked([]);
              onClose();
            }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bundle-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="relative z-10 flex max-h-[min(92vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-cream shadow-soft sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-3 px-4 pb-2 pt-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-mauve-dark">
                  Case + 2 sets · {formatPKR(bundlePrice)}
                </p>
                <h2
                  id="bundle-title"
                  className="font-display text-xl tracking-wide text-charcoal"
                >
                  Pick two sets, love
                </h2>
                <p className="mt-0.5 text-xs text-charcoal/65">
                  {picked.length}/2 chosen — they nestle into your acrylic case.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPicked([]);
                  onClose();
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blush text-mauve-dark"
                aria-label="Close picker"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 overflow-y-auto px-4 pb-3 sm:grid-cols-4">
              {designs.map((p) => {
                const selected = picked.includes(p.slug);
                const order = picked.indexOf(p.slug) + 1;
                return (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => toggle(p.slug)}
                    className={`relative overflow-hidden rounded-2xl text-left ring-2 transition ${
                      selected
                        ? "ring-mauve"
                        : "ring-transparent hover:ring-mauve/30"
                    }`}
                  >
                    <div className="relative aspect-[3/4] bg-blush">
                      <Image
                        src={productImages(p)[0]}
                        alt={p.name}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </div>
                    <p className="truncate bg-cream px-1.5 py-1 text-[10px] font-medium text-charcoal">
                      {p.name}
                    </p>
                    {selected && (
                      <span className="absolute left-1.5 top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-mauve text-[10px] font-semibold text-cream">
                        {order}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-blush px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                disabled={picked.length !== 2}
                onClick={confirm}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-mauve py-3 text-sm font-medium text-cream transition enabled:hover:bg-mauve-dark disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Check className="h-4 w-4" />
                Add case + 2 sets
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
