"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPKR, designBadgeLabel, productImages } from "@/data/products";
import { cartLineId, lineDisplayName, lineUnitPrice, productFor } from "@/lib/order";
import { useSiteHref } from "@/hooks/useSiteHref";

export default function CartDrawer() {
  const router = useRouter();
  const siteHref = useSiteHref();
  const {
    items,
    count,
    subtotal,
    open,
    setOpen,
    setQuantity,
    remove,
    toast,
    dismissToast,
  } = useCart();

  return (
    <>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))] left-1/2 z-[95] w-[min(92vw,360px)] -translate-x-1/2 sm:bottom-8"
          >
            <div className="flex items-center justify-between gap-3 rounded-full bg-charcoal px-4 py-2.5 text-cream shadow-soft">
              <p className="min-w-0 truncate text-xs sm:text-sm">{toast}</p>
              <button
                type="button"
                onClick={() => {
                  dismissToast();
                  setOpen(true);
                }}
                className="shrink-0 text-[11px] font-medium text-blush underline-offset-2 hover:underline"
              >
                View bag
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close bag"
              className="fixed inset-0 z-[105] bg-charcoal/35 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="bag-title"
              className="fixed right-0 top-0 z-[110] flex h-full w-[min(92vw,400px)] flex-col bg-cream shadow-soft"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              <div className="flex items-center justify-between border-b border-blush px-4 py-3.5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-mauve-dark">
                    AYYN.
                  </p>
                  <h2
                    id="bag-title"
                    className="font-display text-2xl tracking-wide text-charcoal"
                  >
                    Your bag ✦
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blush/80 text-mauve-dark"
                  aria-label="Close bag"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blush text-mauve-dark">
                      <ShoppingBag className="h-7 w-7" />
                    </div>
                    <p className="mt-4 font-display text-xl tracking-wide text-mauve-dark">
                      Empty, for now
                    </p>
                    <p className="mt-1 text-sm text-charcoal/70">
                      Your pretty little bag is waiting for a set.
                    </p>
                    <Link
                      href={siteHref("/#collections")}
                      onClick={() => setOpen(false)}
                      className="mt-5 inline-flex rounded-full bg-mauve px-5 py-2.5 text-sm font-medium text-cream hover:bg-mauve-dark"
                    >
                      Shop collections
                    </Link>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {items.map((item) => {
                      const product = productFor(item.slug);
                      if (!product) return null;
                      const cover = productImages(product)[0];
                      const id = cartLineId(item);
                      return (
                        <li
                          key={id}
                          className="flex gap-3 rounded-2xl bg-blush/50 p-2.5 ring-1 ring-mauve/10"
                        >
                          <Link
                            href={siteHref(`/products/${product.slug}`)}
                            onClick={() => setOpen(false)}
                            className="relative h-24 w-[72px] shrink-0 overflow-hidden rounded-xl bg-blush"
                          >
                            <Image
                              src={cover}
                              alt={product.name}
                              fill
                              sizes="72px"
                              className="object-cover"
                            />
                          </Link>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <Link
                                  href={siteHref(`/products/${product.slug}`)}
                                  onClick={() => setOpen(false)}
                                  className="block truncate font-display text-base tracking-wide hover:text-mauve-dark"
                                >
                                  {lineDisplayName(item)}
                                </Link>
                                <p className="text-[10px] uppercase tracking-wider text-mauve-dark">
                                  {designBadgeLabel(product)}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => remove(id)}
                                className="text-[11px] text-charcoal/50 hover:text-mauve-dark"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="inline-flex items-center gap-1 rounded-full bg-cream px-1 py-0.5 ring-1 ring-mauve/15">
                                <button
                                  type="button"
                                  aria-label="Decrease quantity"
                                  onClick={() =>
                                    setQuantity(id, item.quantity - 1)
                                  }
                                  className="inline-flex h-6 w-6 items-center justify-center rounded-full text-mauve-dark"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="min-w-[1.1rem] text-center text-xs font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  aria-label="Increase quantity"
                                  onClick={() =>
                                    setQuantity(id, item.quantity + 1)
                                  }
                                  className="inline-flex h-6 w-6 items-center justify-center rounded-full text-mauve-dark"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <p className="text-xs font-medium text-mauve-dark">
                                {formatPKR(lineUnitPrice(item) * item.quantity)}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-blush px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/70">
                      {count} {count === 1 ? "item" : "items"}
                    </span>
                    <span className="font-display text-xl tracking-wide text-mauve-dark">
                      {formatPKR(subtotal)}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-charcoal/55">
                    Nationwide delivery in 3–5 days after we get your screenshot.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      router.push(siteHref("/checkout"));
                      setOpen(false);
                    }}
                    className="mt-3 flex w-full items-center justify-center rounded-full bg-mauve py-3 text-sm font-medium text-cream transition hover:bg-mauve-dark"
                  >
                    Checkout, cutie
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
