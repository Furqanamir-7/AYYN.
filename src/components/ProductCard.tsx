"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Product,
  formatPKR,
  designBadgeLabel,
  productDisplayPrice,
  productImages,
} from "@/data/products";
import ProductGallery from "./ProductGallery";
import AddToBagControls from "./AddToBagControls";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const router = useRouter();
  const gallery = productImages(product);
  const canSwipe = gallery.length > 1;
  const href = `/products/${product.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl bg-blush/45 shadow-sm ring-1 ring-mauve/10 transition hover:shadow-soft hover:ring-mauve/25"
    >
      <div className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden bg-blush text-left">
        <ProductGallery
          images={gallery}
          alt={`${product.name} — ${designBadgeLabel(product)} by AYYN. PKR ${productDisplayPrice(product)}`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onOpenZoom={() => router.push(href)}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent opacity-80" />
        <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-cream/95 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-mauve-dark shadow-sm backdrop-blur-sm">
          {designBadgeLabel(product)}
        </span>
        <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-mauve px-2 py-0.5 text-[10px] font-semibold text-cream shadow-sm sm:text-[11px]">
          {product.options?.length ? "From " : ""}
          {formatPKR(productDisplayPrice(product))}
        </span>
        <span className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center opacity-0 transition group-hover:opacity-100">
          <span className="rounded-full bg-cream/90 px-2.5 py-1 text-[10px] font-medium tracking-wide text-mauve-dark shadow-sm">
            {canSwipe ? "Swipe · tap to open ✦" : "Tap to open ✦"}
          </span>
        </span>
      </div>
      <div className="space-y-1.5 p-2.5 sm:p-3">
        <Link href={href} className="block">
          <h3 className="font-display text-base leading-tight tracking-wide text-charcoal transition hover:text-mauve-dark sm:text-lg">
            {product.name}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-charcoal/65 sm:text-xs">
            {product.description}
          </p>
        </Link>
        {product.badges && (
          <div className="flex flex-wrap gap-1">
            {product.badges.slice(0, 2).map((b) => (
              <span
                key={b}
                className="rounded-full border border-mauve/25 bg-cream/80 px-1.5 py-0.5 text-[9px] tracking-wide text-mauve-dark"
              >
                {b}
              </span>
            ))}
          </div>
        )}
        <AddToBagControls product={product} />
      </div>
    </motion.article>
  );
}
