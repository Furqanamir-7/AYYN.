"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  Product,
  formatPKR,
  designBadgeLabel,
  productImages,
} from "@/data/products";
import ProductGallery from "./ProductGallery";
import AddToBagControls from "./AddToBagControls";

type Props = {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  initialIndex?: number;
};

export default function ProductZoomLightbox({
  product,
  open,
  onClose,
  initialIndex = 0,
}: Props) {
  const [scale, setScale] = useState(1);
  const gallery = product ? productImages(product) : [];

  useEffect(() => {
    if (!open) return;
    setScale(1);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && product && (
        <motion.div
          className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            aria-label="Close backdrop"
            className="absolute inset-0 bg-charcoal/45 backdrop-blur-[3px]"
            onClick={onClose}
          />

          <div className="relative z-10 flex max-h-[min(94vh,760px)] flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-3">
            <div className="pointer-events-none hidden w-40 shrink-0 sm:block" aria-hidden />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${product.name} detail view`}
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="flex w-[min(88vw,340px)] flex-col overflow-hidden rounded-3xl bg-cream shadow-soft ring-1 ring-mauve/20 sm:w-[min(70vw,380px)]"
            >
              <div className="flex items-start justify-between gap-2 px-3 pb-1.5 pt-3">
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-mauve-dark">
                    {designBadgeLabel(product)} ·{" "}
                    {product.options?.length
                      ? `From ${formatPKR(product.price)}`
                      : formatPKR(product.price)}
                  </p>
                  <h2 className="truncate font-display text-base tracking-wide text-charcoal sm:text-lg">
                    {product.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blush text-mauve-dark transition hover:bg-mauve hover:text-cream"
                  aria-label="Close zoom"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div
                className="relative mx-2.5 overflow-hidden rounded-2xl bg-blush"
                style={{ aspectRatio: "3 / 4" }}
                onWheel={(e) => {
                  e.preventDefault();
                  setScale((s) =>
                    Math.min(2.5, Math.max(1, s - e.deltaY * 0.0018))
                  );
                }}
              >
                <motion.div
                  className="absolute inset-0 origin-center"
                  animate={{ scale }}
                  transition={{ type: "spring", damping: 28, stiffness: 260 }}
                >
                  <ProductGallery
                    key={`${product.slug}-${initialIndex}`}
                    images={gallery}
                    alt={product.name}
                    sizes="380px"
                    priority
                    showArrows
                    arrowsAlwaysVisible
                    initialIndex={initialIndex}
                    onIndexChange={() => setScale(1)}
                  />
                </motion.div>
                <motion.span
                  className="pointer-events-none absolute right-2.5 top-2.5 z-10 text-xs text-cream/90 drop-shadow"
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.08, 0.9] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  ✦
                </motion.span>
              </div>

              <div className="flex items-center justify-center gap-2 px-3 py-2.5">
                <button
                  type="button"
                  onClick={() => setScale((s) => Math.max(1, s - 0.25))}
                  className="rounded-full border border-mauve/30 bg-cream px-3 py-1 text-xs text-mauve-dark"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => setScale(1)}
                  className="rounded-full border border-mauve/30 bg-cream px-3 py-1 text-xs text-mauve-dark"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setScale((s) => Math.min(2.5, s + 0.25))}
                  className="rounded-full border border-mauve/30 bg-cream px-3 py-1 text-xs text-mauve-dark"
                >
                  +
                </button>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.08, duration: 0.3 }}
              className={`w-[min(88vw,340px)] shrink-0 ${
                product.category === "Accessories" ? "sm:w-52" : "sm:w-40"
              }`}
            >
              <p className="mb-2 hidden text-center text-[10px] uppercase tracking-[0.16em] text-cream/90 sm:block">
                {product.category === "Accessories" ? "Add this extra" : "Add this set"}
              </p>
              <AddToBagControls
                product={product}
                variant="lightbox"
                onAdded={onClose}
              />
            </motion.aside>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
