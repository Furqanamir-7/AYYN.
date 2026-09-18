"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";
import AnimatedSection from "./AnimatedSection";
import {
  collections,
  latestCollection,
  pressOnProducts,
  productsByCollection,
} from "@/data/products";
import type { Collection, Product } from "@/data/products";

const FILTERS = [
  { id: "All", label: "All" },
  { id: latestCollection.id, label: latestCollection.name },
  ...collections.map((c) => ({ id: c.id, label: c.name })),
] as const;

function CollectionBlock({
  col,
  items,
}: {
  col: Collection;
  items: Product[];
}) {
  if (!items.length) return null;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
    >
      <AnimatedSection>
        <div className="mb-4 sm:mb-5">
          <h3 className="font-display text-xl tracking-wide sm:text-2xl md:text-3xl">
            <span className="mr-1.5" aria-hidden>
              {col.emoji}
            </span>
            {col.name}
          </h3>
          <p className="mt-1 text-xs text-charcoal/70 sm:text-sm">{col.vibe}</p>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4">
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </AnimatedSection>
    </motion.div>
  );
}

export default function CollectionsSection() {
  const [filter, setFilter] = useState<string>("All");

  const visibleCollections = useMemo(() => {
    if (filter === "All" || filter === "latest") return [];
    return collections.filter((c) => c.id === filter);
  }, [filter]);

  const showLatest = filter === "All" || filter === "latest";

  return (
    <section id="collections" className="scroll-mt-20 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <p className="text-xs uppercase tracking-[0.25em] text-mauve-dark">
            Shop
          </p>
          <h2 className="mt-2 font-display text-2xl tracking-wide sm:text-3xl md:text-4xl">
            Collections
          </h2>
          <p className="mt-2 max-w-xl text-sm text-charcoal/70">
            Tap a design to open it. Prices in PKR.
          </p>
        </AnimatedSection>

        <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar pb-1 sm:mt-6">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs tracking-wide transition sm:px-4 sm:py-2 ${
                filter === f.id
                  ? "bg-mauve text-cream shadow-sm"
                  : "bg-blush/60 text-mauve-dark hover:bg-blush"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-12 sm:mt-10 sm:space-y-14">
          <AnimatePresence mode="popLayout">
            {showLatest && (
              <CollectionBlock
                key={latestCollection.id}
                col={latestCollection}
                items={productsByCollection("latest")}
              />
            )}
            {(filter === "All" ? collections : visibleCollections).map((col) => (
              <CollectionBlock
                key={col.id}
                col={col}
                items={productsByCollection(col.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-[11px] text-charcoal/55 sm:mt-10 sm:text-xs">
          {pressOnProducts().length} designs · accessories too · From PKR{" "}
          {Math.min(...pressOnProducts().map((p) => p.price)).toLocaleString("en-PK")} ·
          Advance payment only
        </p>
      </div>
    </section>
  );
}
