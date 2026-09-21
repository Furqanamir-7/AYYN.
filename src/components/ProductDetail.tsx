"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Product,
  formatPKR,
  designBadgeLabel,
  productDisplayPrice,
  productImages,
  getCollection,
} from "@/data/products";
import ProductGallery from "./ProductGallery";
import ProductZoomLightbox from "./ProductZoomLightbox";
import AddToBagControls from "./AddToBagControls";
import ProductCard from "./ProductCard";
import { useSiteHref } from "@/hooks/useSiteHref";

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);
  const gallery = productImages(product);
  const collection = getCollection(product.collectionId);
  const fromPrice = product.options?.length;
  const price = productDisplayPrice(product);
  const siteHref = useSiteHref();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href={siteHref("/#collections")}
        className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-mauve-dark transition hover:text-charcoal sm:text-sm"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to collections
      </Link>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-10">
        <div className="overflow-hidden rounded-2xl bg-blush/45 ring-1 ring-mauve/10 sm:rounded-3xl">
          <div
            className="relative aspect-[3/4] w-full cursor-zoom-in overflow-hidden bg-blush"
            aria-label={`View ${product.name} photos`}
          >
            <ProductGallery
              key={product.slug}
              images={gallery}
              alt={`${product.name} — ${designBadgeLabel(product)} by AYYN. ${formatPKR(price)}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              showArrows
              arrowsAlwaysVisible
              onOpenZoom={(i) => {
                setZoomIndex(i);
                setZoomOpen(true);
              }}
            />
            <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-cream/95 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-mauve-dark shadow-sm">
              {designBadgeLabel(product)}
            </span>
          </div>
        </div>

        <div className="lg:pt-2">
          {collection && (
            <p className="text-[10px] uppercase tracking-[0.22em] text-mauve-dark sm:text-xs">
              {collection.emoji} {collection.name}
            </p>
          )}
          <h1 className="mt-1 font-display text-3xl tracking-wide text-charcoal sm:text-4xl md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-2 font-display text-xl text-mauve-dark sm:text-2xl">
            {fromPrice ? "From " : ""}
            {formatPKR(price)}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal/75 sm:text-base">
            {product.description}
          </p>

          {product.badges && product.badges.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-mauve/25 bg-cream/80 px-2.5 py-1 text-[11px] tracking-wide text-mauve-dark"
                >
                  {b}
                </span>
              ))}
            </div>
          )}

          {product.shapes && product.shapes.length > 0 && (
            <div className="mt-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-mauve-dark">
                Shapes
              </p>
              <p className="mt-1 text-sm text-charcoal/75">
                {product.shapes.join(", ")} — tell us yours in the notes box at
                checkout.
              </p>
            </div>
          )}

          <div className="mt-6 max-w-sm">
            <AddToBagControls product={product} variant="lightbox" />
          </div>

          <p className="mt-4 max-w-sm text-xs leading-relaxed text-charcoal/60">
            Add to bag, checkout on the website, then send your NayaPay or
            JazzCash screenshot on WhatsApp to complete the order.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12 sm:mt-16">
          <p className="text-[10px] uppercase tracking-[0.22em] text-mauve-dark sm:text-xs">
            More from AYYN.
          </p>
          <h2 className="mt-1 font-display text-2xl tracking-wide sm:text-3xl">
            You may also like
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <ProductZoomLightbox
        product={product}
        open={zoomOpen}
        initialIndex={zoomIndex}
        onClose={() => setZoomOpen(false)}
      />
    </div>
  );
}
